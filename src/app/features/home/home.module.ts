import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {SharedModule} from "../../shared/shared.module";
import {FeaturesModule} from "../features.module";
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [CoreModule, SharedModule],
  exports: [CoreModule, SharedModule],
})
export class HomeModule {}
