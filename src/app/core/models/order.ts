import {IAddress} from "./address";
import { v4 as uuidv4 } from 'uuid';

export interface IOrderToCreate {
  basketId: string;
  deliveryMethodId: string;
  shipToAddress: IAddress;
}

export class OrderToCreate {

  constructor(basketId: string, deliveryMethodId: string, shipToAddress: IAddress) {
    this.basketId = basketId;
    this.deliveryMethodId = deliveryMethodId;
    this.shipToAddress = shipToAddress;
  }

  basketId: string;
  deliveryMethodId: string;
  shipToAddress: IAddress;
}

export interface IOrder {
  id: string;
  buyerEmail: string; //
  orderDate: string; //
  shipToAddress: IAddress; //
  deliveryMethod: string; //
  shippingPrice: number;
  orderItems: IOrderItem[]; //
  subtotal: number; //
  total: number;
  status: string;
}

export class Order {
  //uuid4 to id
  id: string = uuidv4();
  buyerEmail: string;
  orderDate: Date = new Date();
  shipToAddressId: string;
  deliveryMethodId: string;
  subtotal: number;
  orderItems: IOrderItem[] = [];
  total: number;
  status: string;
}

export interface IOrderItem {
  id: string;
  productId: string;
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}
