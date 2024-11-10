export interface CartItem {
  productId: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
}

export interface Cart {
  _id: string;
  userId: string;
  products: CartItem[];
  totalPrice: number;
}