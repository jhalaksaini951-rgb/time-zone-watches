export interface OrderItemDto {
  productId: string;
  colorIndex: number;
  qty: number;
}

export interface CreateOrderDto {
  customer: { name: string; email: string; phone?: string; address: string };
  items: OrderItemDto[];
}