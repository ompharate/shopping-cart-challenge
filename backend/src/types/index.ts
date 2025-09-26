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

export interface CheckoutRequest {
  items: CartItem[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface CheckoutResponse {
  success: boolean;
  message: string;
  orderId: string;
  total: string;
}