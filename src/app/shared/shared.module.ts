import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from "ngx-bootstrap/pagination";
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { CarouselModule } from 'primeng/carousel';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import {RouterLink, RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatMenuModule} from "@angular/material/menu";
import { TextInputComponent } from './components/text-input/text-input.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { CheckoutOptionContainerComponent } from './components/checkout-option-container/checkout-option-container.component';
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
import { ProductItemsCarouselComponent } from './components/product-items-carousel/product-items-carousel.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SubscribeBlockComponent } from '../core/components/subscribe-block/subscribe-block.component';
import { ButtonComponent } from './components/button/button.component';
import { ToastModule } from 'primeng/toast';
import { RelatedProductsComponent } from './components/related-products/related-products/related-products.component';
import { SeenItemsComponent } from './components/seen-items/seen-items.component';
import {SeenItemComponent} from './components/seen-items/seen-item/seen-item.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MaterialModule} from "../../material.module";
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component';
import { DiscountPipe } from './pipes/discount.pipe';
import { ShortenPipe } from './pipes/shorten.pipe';
import { ReviewComponent } from './components/review/review.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { GradientShadowDirective } from './directives/gradient-shadow/gradient-shadow.directive';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
    TextInputComponent,
    StepperComponent,
    BasketSummaryComponent,
    CheckoutOptionContainerComponent,
    ProductItemComponent,
    ProductItemsCarouselComponent,
    NavigationBarComponent,
    SubscribeBlockComponent,
    ButtonComponent,
    RelatedProductsComponent,
    ProductItemComponent,
    RelatedProductsComponent,
    SeenItemsComponent,
    SeenItemComponent,
    ProductListItemComponent,
    DiscountPipe,
    ShortenPipe,
    ReviewComponent,
    EmptyComponent,
    GradientShadowDirective,
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
    PagingHeaderComponent,
    PagerComponent,
    CarouselModule,
    OrderTotalsComponent,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    TextInputComponent,
    BasketSummaryComponent,
    CheckoutOptionContainerComponent,
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
    ProductItemsCarouselComponent,
    NavigationBarComponent,
    SubscribeBlockComponent,
    ButtonComponent,
    ToastModule,
    ProductItemComponent,
    RelatedProductsComponent,
    SeenItemsComponent,
    MatSidenavModule,
    MatListModule,
    ProductListItemComponent,
    ReviewComponent,
    EmptyComponent,
    SeenItemComponent,
    ConfirmDialogModule,
    GradientShadowDirective,
    NgxSkeletonLoaderModule,
    InputTextareaModule,
    MatTabsModule
  ]
})
export class SharedModule { }
