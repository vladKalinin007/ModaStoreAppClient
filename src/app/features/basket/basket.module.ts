import { NgModule } from '@angular/core';
import { BasketComponent } from './basket/basket.component';
import {FeaturesModule} from "../features.module";
import {BasketRoutingModule} from "./basket-routing.module";



@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    FeaturesModule,
    BasketRoutingModule,
  ]
})
export class BasketModule { }
