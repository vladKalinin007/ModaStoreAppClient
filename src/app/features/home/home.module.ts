import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {SharedModule} from "../../shared/shared.module";
import {FeaturesModule} from "../features.module";
import { CoreModule } from 'src/app/core/core.module';
import { ReviewsBlockComponent } from 'src/app/shared/components/reviews-block/reviews-block.component';

@NgModule({
  imports: [
    CoreModule, 
    SharedModule,
    ReviewsBlockComponent
  ],
  exports: [
    CoreModule, 
    SharedModule,
    ReviewsBlockComponent
  ],
})
export class HomeModule {}
