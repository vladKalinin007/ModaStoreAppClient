import { NgModule } from '@angular/core';
import { BasketComponent } from './basket/basket.component';
import {FeaturesModule} from "../features.module";
import {BasketRoutingModule} from "./basket-routing.module";
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    BasketComponent,
  ],
  imports: [
    FeaturesModule,
    BasketRoutingModule,
    SharedModule
  ]
})
export class BasketModule { }
