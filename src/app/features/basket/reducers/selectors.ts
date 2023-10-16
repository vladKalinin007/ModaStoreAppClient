import { createSelector } from '@ngrx/store';
import { BasketState } from './basket.state';

export const selectBasket = (state: BasketState) => state.basket;

export const selectBasketTotals = (state: BasketState) => state.basketTotals;

export const selectBasketItemsCount = createSelector(
  selectBasket,
  basket => basket.items.length
);

export const selectShippingPrice = createSelector(
  selectBasket,
  basket => basket.shippingPrice
);
