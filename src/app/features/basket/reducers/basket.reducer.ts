// import { createReducer, on } from '@ngrx/store';
// import { BasketActions } from '../basket.actions';
// import { IBasketItem } from '../../../core/models/basket';
// import {BasketState, BasketStateRecord} from "./basket.state";
//
// export const initialState: BasketState = (new BasketStateRecord() as unknown) as BasketState;
//
// export function reducer(state = initialState, { type, payload }: any): BasketState {
//   let _totalBasketItems = 0,
//     _totalBasketValue = 0
//
//   switch (type) {
//     case BasketActions.INCREMENT_ITEM_QUANTITY:
//       _totalBasketItems = state.get('basketItemsCount') + 1;
//
//       return state.merge({
//         basketItemsCount: _totalBasketItems,
//       });
//
//       }
//   }
// }


