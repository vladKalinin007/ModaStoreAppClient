import { createReducer, on } from '@ngrx/store';
import {IBasket, IBasketTotals} from "../../../core/models/basket";
import {clearBasket, setBasket} from "../basket.actions";


export const initialBasketState: IBasket = null;
export const initialBasketTotalsState: IBasketTotals = null;

export const basketReducer = createReducer(
  initialBasketState,
  on(setBasket, (state, { basket }) => basket),
  on(clearBasket, () => initialBasketState)
);

export const basketTotalsReducer = createReducer(
  initialBasketTotalsState,

);
