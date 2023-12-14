import { AsyncPipe, DatePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgxSkeletonLoaderComponent, NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { RatingModule } from "primeng/rating";
import { Observable, map } from "rxjs";
import { IProductReview } from "src/app/core/models/catalog/product-review";
import { SharedModule } from "../../shared.module";

@Component({
    selector: 'app-reviews-block',
    templateUrl: './reviews-block.component.html',
    styleUrls: ['./reviews-block.component.scss'],
    standalone: true,
    imports: [
        RatingModule,
        FormsModule,
        AsyncPipe,
        DatePipe,
        SharedModule,
    ]
})
export class ReviewsBlockComponent {
    @Input() reviews$: Observable<IProductReview[]>
}
