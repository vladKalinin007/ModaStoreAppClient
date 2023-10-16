import {BasketState, initialBasketState} from "./basket.state";
import {Action, createReducer, on} from "@ngrx/store";
import {IBasket} from "../../../core/models/basket";
import * as BasketActions from '../basket.actions';

export const basketReducer = createReducer(
  initialBasketState,
  on(BasketActions.setBasket, (state, { basket }) => ({ ...state, basket })),
  on(BasketActions.clearBasket, (state) => ({ ...state, basket: { id: '', items: [] } })),
  on(BasketActions.setShipping, (state, { shipping }) => {
    const basket: IBasket = { ...state.basket, shippingPrice: shipping };
    return { ...state, basket };
  }),
  on(BasketActions.setBasketTotal, (state, { basketTotal }) => {
  const basket: IBasket = { ...state.basket, ...basketTotal };
  return { ...state, basket };
  })
);

export function reducer(state: BasketState | undefined, action: Action) {
  return basketReducer(state, action);
}
