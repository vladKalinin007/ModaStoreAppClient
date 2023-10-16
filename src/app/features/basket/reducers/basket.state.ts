import {IBasket, IBasketTotals} from "../../../core/models/basket";

export interface BasketState {
  basket: IBasket;
  basketTotal: IBasketTotals;
  shipping: number;
}

export const initialBasketState: BasketState = {
  basket: {
    id: '',
    items: []
  },
  basketTotal: {
    shipping: 0,
    subtotal: 0,
    total: 0
  },
  shipping: 0
};
