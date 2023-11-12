import { NgModule } from '@angular/core';
import {CoreModule} from "../core/core.module";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
  ],
  imports: [
    CoreModule,
    SharedModule
  ],
  exports: [
    CoreModule,
    SharedModule,
  ]
})
export class FeaturesModule { }
