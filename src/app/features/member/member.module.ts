import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeaturesModule} from "../features.module";
import { MemberComponent } from './member/member.component';



@NgModule({
  declarations: [
    MemberComponent
  ],
  imports: [
    FeaturesModule
  ]
})
export class MemberModule { }
