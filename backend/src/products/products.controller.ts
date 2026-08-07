import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')          // saare URL /products se shuru
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()                          // GET /products  ya  /products?cat=mens
  findAll(@Query('cat') cat?: string) {
    return this.productsService.findAll(cat);
  }

  @Get(':id')                     // GET /products/m1
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
  @Post()                          // POST /products — naya product
  create(@Body() data: any) {
    return this.productsService.create(data);
  }

  @Patch(':id')                    // PATCH /products/m1 — edit
  update(@Param('id') id: string, @Body() data: any) {
    return this.productsService.update(id, data);
  }

  @Delete(':id')                   // DELETE /products/m1 — delete
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}