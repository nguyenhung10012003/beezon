export class CreateCartDto {
  products?: { id: string, quantity: number }[];
  user: string;
}
