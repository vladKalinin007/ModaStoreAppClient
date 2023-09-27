import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {SharedModule} from "../../shared/shared.module";
import {FeaturesModule} from "../features.module";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    FeaturesModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {

}
