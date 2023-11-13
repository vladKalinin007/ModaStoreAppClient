import { AsyncPipe, DatePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RatingModule } from "primeng/rating";
import { Observable, map } from "rxjs";
import { IProductReview } from "src/app/core/models/catalog/product-review";

@Component({
    selector: 'app-reviews-block',
    templateUrl: './reviews-block.component.html',
    styleUrls: ['./reviews-block.component.scss'],
    standalone: true,
    imports: [
        RatingModule,
        FormsModule,
        AsyncPipe,
        DatePipe
    ]
})
export class ReviewsBlockComponent {
    @Input() reviews$: Observable<IProductReview[]>
}
