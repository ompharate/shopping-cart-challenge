export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}