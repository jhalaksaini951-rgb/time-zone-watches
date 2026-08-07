import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  findAll(cat?: string) {
    return this.prisma.product.findMany({
      where: cat ? { cat } : undefined,
      orderBy: { id: 'asc' },

    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found: ' + id);
    return product;
  }
  create(data: any) {
    return this.prisma.product.create({ data });
  }
  update(id: string, data: any) {
    return this.prisma.product.update({ where: { id }, data });
  }
  remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}