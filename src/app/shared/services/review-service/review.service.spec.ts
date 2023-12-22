import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReviewService } from './review.service';
import { IProductReview } from 'src/app/core/models/catalog/product-review';
import { IProduct } from 'src/app/core/models/product';
import { TestBed } from '@angular/core/testing';
import { productMock } from '../../mocks/product.mock';
import { reviewMock } from '../../mocks/review.mock';

describe('ReviewService', () => {
  let service: ReviewService;
  let httpMock: HttpTestingController;
  let review: IProductReview;
  let product: IProduct;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReviewService]
    });

    service = TestBed.inject(ReviewService);
    httpMock = TestBed.inject(HttpTestingController);

    review = reviewMock;

    product = productMock;
  });

  it('should get user reviews', () => {
    const mockReviews = [review];

    service.getUserReviews().subscribe(res => {
      expect(res).toEqual(mockReviews);
    });

    const req = httpMock.expectOne(service.BASE_URL);
    expect(req.request.method).toBe('GET');
    req.flush(mockReviews);
  });

  it('should get reviews for product', () => {
    const mockReviews = [review];

    service.getReviewsForProduct(product.id).subscribe(res => {
      expect(res).toEqual(mockReviews);
    });

    const req = httpMock.expectOne(`${service.BASE_URL}/products/${product.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockReviews);
  });

  it('should delete user review', () => {
    service.deleteUserReview(review.id).subscribe(res => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne(`${service.BASE_URL}${review.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  afterEach(() => {
    httpMock.verify();
  });
});