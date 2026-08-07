import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    const c = dto?.customer;
    if (!c?.name || !c?.email || !c?.address) {
      throw new BadRequestException('Name, email aur address zaroori hain');
    }
    if (!dto.items?.length) throw new BadRequestException('Cart khaali hai');

    // ★ Price frontend se NAHI lete — hamesha database se.
    const products = await this.prisma.product.findMany({
      where: { id: { in: dto.items.map((i) => i.productId) } },
    });

    const lines = dto.items.map((item) => {
      const p = products.find((x) => x.id === item.productId);
      if (!p) throw new BadRequestException('Product nahi mila: ' + item.productId);

      const qty = Math.max(1, Math.floor(item.qty));
      if (p.stock < qty) throw new BadRequestException(p.name + ' ka itna stock nahi hai');

      const colors = p.colors as { n: string; c: string }[];
      const color = colors[item.colorIndex]?.n ?? colors[0]?.n ?? '';

      return { productId: p.id, name: p.name, color, price: p.price, qty };
    });

    const total = lines.reduce((t, l) => t + l.price * l.qty, 0);

    // ★ Transaction: order banana AUR stock kam karna — dono saath ya dono nahi.
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          name: c.name,
          email: c.email,
          phone: c.phone || '',
          address: c.address,
          total,
          items: { create: lines },
        },
        include: { items: true },
      });

      for (const l of lines) {
        await tx.product.update({
          where: { id: l.productId },
          data: { stock: { decrement: l.qty } },
        });
      }

      return order;
    });
  }
// Saare orders (naye pehle)
  findAll() {
    return this.prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
  }
  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!order) throw new NotFoundException('Order not found: ' + id);
    return order;
  }
}