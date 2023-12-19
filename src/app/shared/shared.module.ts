import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from "ngx-bootstrap/pagination";
import { CarouselModule } from 'primeng/carousel';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import {RouterLink, RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatMenuModule} from "@angular/material/menu";
import { TextInputComponent } from './components/text-input/text-input.component';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import {MatDialogModule} from "@angular/material/dialog";
import {SliderModule} from "primeng/slider";
import {RatingModule} from "primeng/rating";
import {RadioButtonModule} from "primeng/radiobutton";
import {GalleriaModule} from "primeng/galleria";
import {BadgeModule} from "primeng/badge";
import {SpeedDialModule} from "primeng/speeddial";
import {SelectButtonModule} from "primeng/selectbutton";
import {ToggleButtonModule} from "primeng/togglebutton";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {TabViewModule} from "primeng/tabview";
import {InputMaskModule} from "primeng/inputmask";
import {AccordionModule} from "primeng/accordion";
import {TriStateCheckboxModule} from "primeng/tristatecheckbox";
import {TagModule} from "primeng/tag";
import {SidebarModule} from "primeng/sidebar";
import {DropdownModule} from "primeng/dropdown";
import {MatRadioModule} from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { ProductItemComponent } from './components/product-item/product-item.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { ButtonComponent } from './components/button/button.component';
import { ToastModule } from 'primeng/toast';
import { RelatedProductsComponent } from './components/related-products/related-products/related-products.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MaterialModule} from "../../material.module";
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component';
import { DiscountPipe } from './pipes/discount.pipe';
import { ShortenPipe } from './pipes/shorten.pipe';
import { ReviewComponent } from './components/review/review.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    OrderTotalsComponent,
    TextInputComponent,
    BasketSummaryComponent,
    ProductItemComponent,
    NavigationBarComponent,
    ButtonComponent,
    RelatedProductsComponent,
    ProductItemComponent,
    RelatedProductsComponent,
    ProductListItemComponent,
    DiscountPipe,
    ShortenPipe,
    ReviewComponent,
    EmptyComponent,
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ConfirmDialogModule,
    RouterLink,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    RouterModule,
    MatDialogModule,
    SliderModule,
    RatingModule,
    RadioButtonModule,
    GalleriaModule,
    BadgeModule,
    SpeedDialModule,
    SelectButtonModule,
    ToggleButtonModule,
    OverlayPanelModule,
    TabViewModule,
    InputMaskModule,
    AccordionModule,
    TriStateCheckboxModule,
    CarouselModule,
    TagModule,
    SidebarModule,
    DropdownModule,
    MatRadioModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    ToastModule,
    MatSidenavModule,
    MatListModule,
    MaterialModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    InputTextareaModule,
    MatTabsModule
  ],
  exports: [
    PaginationModule,
    CarouselModule,
    OrderTotalsComponent,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    TextInputComponent,
    BasketSummaryComponent,
    MatDialogModule,
    SliderModule,
    RatingModule,
    RadioButtonModule,
    GalleriaModule,
    BadgeModule,
    SpeedDialModule,
    SelectButtonModule,
    ToggleButtonModule,
    OverlayPanelModule,
    TabViewModule,
    InputMaskModule,
    AccordionModule,
    TriStateCheckboxModule,
    CarouselModule,
    TagModule,
    SidebarModule,
    DropdownModule,
    MatRadioModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    NavigationBarComponent,
    ButtonComponent,
    ToastModule,
    ProductItemComponent,
    RelatedProductsComponent,
    MatSidenavModule,
    MatListModule,
    ProductListItemComponent,
    ReviewComponent,
    EmptyComponent,
    ConfirmDialogModule,
    NgxSkeletonLoaderModule,
    InputTextareaModule,
    MatTabsModule
  ]
})
export class SharedModule { }
