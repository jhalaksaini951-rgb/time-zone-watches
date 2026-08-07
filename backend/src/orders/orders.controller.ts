import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()                                    // POST /orders — naya order
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }
  @Get()                           // GET /orders — saare orders
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')                                // GET /orders/1
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }
}