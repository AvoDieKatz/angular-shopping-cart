export interface Product {
  id: number;
  name: string;
  price: number;
  color: string;
  stock: number;
  sold: number;
  qty?: number
}