import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import {RouterModule} from "@angular/router";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import {ToastrModule} from "ngx-toastr";
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import {BreadcrumbModule} from "xng-breadcrumb";
import {SharedModule} from "../shared/shared.module";
import { NavModalComponent } from './components/nav-modal/nav-modal/nav-modal.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    ServerErrorComponent,
    SectionHeaderComponent,
    NavModalComponent,
    ],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    SharedModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SectionHeaderComponent,
    NavModalComponent,
  ]
})
export class CoreModule { }
