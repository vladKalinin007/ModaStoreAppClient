import {inject, Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import * as BasketActions from './basket.actions';
import {BasketService} from "./basket.service";

@Injectable()
export class BasketEffects {

  private _basketService: BasketService = inject(BasketService);
  private _actions$: Actions = inject(Actions);

  // createPaymentIntent$ = createEffect(() =>
  //   this._actions$.pipe(
  //     ofType(BasketActions.createPaymentIntent),
  //     switchMap(() => this._basketService.createPaymentIntent()),
  //     map((basket) => BasketActions.setBasket({ basket }))
  //   )
  // );

  setShippingPrice$ = createEffect(() =>
    this._actions$.pipe(
      ofType(BasketActions.setShipping)
    )
  );

  setBasketTotal$ = createEffect(() =>
    this._actions$.pipe(
      ofType(BasketActions.setBasketTotal)
    )
  );

  setBasket$ = createEffect(() =>
    this._actions$.pipe(
      ofType(BasketActions.setBasket),
      map((basket) => BasketActions.setBasket(basket))
    )
  );


}
