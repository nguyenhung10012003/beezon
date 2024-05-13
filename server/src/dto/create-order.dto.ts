export class CreateOrderDto {
  products: { product: string, quantity: number }[];
  user: string;
  seller: string;
}
