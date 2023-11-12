import { AsyncPipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RatingModule } from "primeng/rating";
import { Observable } from "rxjs";
import { IProductReview } from "src/app/core/models/catalog/product-review";

@Component({
    selector: 'app-reviews-block',
    templateUrl: './reviews-block.component.html',
    styleUrls: ['./reviews-block.component.scss'],
    standalone: true,
    imports: [
        RatingModule,
        FormsModule,
        AsyncPipe
    ]
})
export class ReviewsBlockComponent implements OnInit {
    @Input() reviews$: Observable<IProductReview[]>
    
    rating: number;

    constructor() { }

    ngOnInit(): void {
        this.reviews$.subscribe({
            next: (reviews) => {
                this.rating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
            }
        })

    }

}
