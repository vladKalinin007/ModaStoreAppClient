import { NgModule } from '@angular/core';
import { WishlistComponent } from './wishlist/wishlist.component';
import {SharedModule} from "../../shared/shared.module";
import {FeaturesModule} from "../features.module";
import {WishlistRoutingModule} from "./wishlist-routing.module";

@NgModule({
  declarations: [
    WishlistComponent
  ],
    imports: [
        FeaturesModule,
        WishlistRoutingModule,
        SharedModule
    ],
})
export class WishlistModule { }
