import { v4 as uuidv4 } from 'uuid';

export interface IBasket {
  id: string
  items: IBasketItem[]
  clientSecret?: string
  paymentIntentId?: string
  deliveryMethodId?: string
  shippingPrice?: number
}

export interface IBasketItem {
  id: string
  productName: string
  price: number
  quantity: number
  pictureUrl: string
  brand: string
  type: string
  isBestSeller?: boolean
  isNew?: boolean
  oldPrice?: number
}

export class Basket implements IBasket {
  id = uuidv4();
  items: IBasketItem[] = [];
}

export interface IBasketTotals {
  shipping: number
  subtotal: number
  total: number
}

export class BasketTotals implements IBasketTotals {
  shipping: number = 0;
  subtotal: number = 0;
  total: number = 0;
}


