import {IBasket, IBasketTotals} from "../../../core/models/basket";
import {basketReducer, basketTotalsReducer} from "./basket.reducer";
import {ActionReducerMap} from "@ngrx/store";
import * as BasketActions from '../basket.actions';



export interface BasketState {
  basket: IBasket;
  basketTotals: IBasketTotals;
}

export const reducers: ActionReducerMap<BasketState> = {
  basket: basketReducer,
  basketTotals: basketTotalsReducer
};

export {
  BasketActions
};
