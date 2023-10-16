import { createAction, props } from '@ngrx/store';
import {IBasket, IBasketItem, IBasketTotals} from "../../core/models/basket";
import {IDeliveryMethod} from "../../core/models/deliveryMethod";



export const setBasket = createAction(
  '[Basket] Set Basket',
  props<{ basket: IBasket }>()
);
export const clearBasket = createAction(
  '[Basket] Clear Basket'
);
export const addItemToBasket = createAction(
  '[Basket] Add Item',
  props<{ item: IBasketItem, quantity: number }>()
);
export const removeItemFromBasket = createAction(
  '[Basket] Remove Item',
  props<{ item: IBasketItem }>()
);
export const updateItemQuantity = createAction(
  '[Basket] Update Item Quantity',
  props<{ item: IBasketItem, quantity: number }>()
);
export const setShipping = createAction(
  '[Basket] Set Shipping',
  props<{ shipping: number }>()
);
export const setBasketTotal = createAction(
  '[Basket] Set Basket Total',
  props<{ basketTotal: IBasketTotals }>()
);
export const createPaymentIntent = createAction(
  '[Basket] Create Payment Intent'
);
export const setShippingPrice = createAction(
  '[Basket] Set Shipping Price',
  props<{ deliveryMethod: IDeliveryMethod }>())
;
export const getBasket = createAction(
  '[Basket] Get Basket', props<{ id: string }>()
);
export const deleteBasket = createAction(
  '[Basket] Delete Basket',
  props<{ basket: IBasket }>()
);
export const deleteLocalBasket = createAction(
  '[Basket] Delete Local Basket',
  props<{ id: string }>()
);

