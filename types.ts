
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  flavors?: string[];
  sizes?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedFlavor?: string;
  selectedSize?: string;
}

export enum Category {
  CAKES = 'Cakes',
  CUPCAKES = 'Cupcakes',
  MACARONS = 'Macarons',
  GIFTS = 'Gifts'
}
