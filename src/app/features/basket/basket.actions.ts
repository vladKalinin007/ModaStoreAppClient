import { createAction, props } from '@ngrx/store';
import {IBasket} from "../../core/models/basket";


export const setBasket = createAction(
  '[Basket] Set Basket',
  props<{ basket: IBasket }>()
);
export const clearBasket = createAction(
  '[Basket] Clear Basket'
);
export const setBasketTotal = createAction(
  '[Basket] Set Basket Total',
  props<{ basketTotal: any }>()
);
export const setShipping = createAction(
  '[Basket] Set Shipping',
  props<{ shipping: number }>()
);
