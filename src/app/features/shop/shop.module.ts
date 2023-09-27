import { NgModule } from '@angular/core';
import { ShopComponent } from './shop.component';
import {FormsModule} from "@angular/forms";
import { ProductDetailsComponent } from './product-details/product-details.component';
import {ShopRoutingModule} from "./shop-routing.module";
import {FeaturesModule} from "../features.module";
import {MaterialModule} from "../../../material.module";



@NgModule({
    declarations: [
        ShopComponent,
        ProductDetailsComponent,
    ],
    exports: [


    ],
    imports: [
        FeaturesModule,
        FormsModule,
        ShopRoutingModule,
        MaterialModule,
    ]
})
export class ShopModule { }
