import { NgModule } from '@angular/core';
import {FeaturesModule} from "../features.module";
import { AdminComponent } from './admin/admin.component';



@NgModule({
  declarations: [

  
    AdminComponent
  ],
  imports: [
    FeaturesModule
  ]
})
export class AdminModule { }
