import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { HomeService } from './home.service';
import { ICategory } from 'src/app/core/models/category';
import { productMock } from 'src/app/shared/mocks/product.mock';
import { IProduct } from 'src/app/core/models/product';
import { IProductReview } from 'src/app/core/models/catalog/product-review';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from 'src/app/shared/services/product-service/product.service';
import { IPagination } from 'src/app/core/models/pagination';
import { ReviewService } from 'src/app/shared/services/review-service/review.service';


describe('HomeService', () => {
  let service: HomeService;
  let productService: ProductService;
  let reviewService: ReviewService; 

  const mockResponse: IProductReview[] = [
    
  ];

  const mockResponseProduct: IProduct[] = [
    
  ];

  const mockResponseCategory: ICategory[] = [
    { id: '1', name: 'Category 1', displayOrder: 1, pictureUrl: 'url1' },
    { id: '2', name: 'Category 2', displayOrder: 2, pictureUrl: 'url2' }
  ];

  const categoryServiceStub = {
    categories$: of(mockResponse)
  };

  const mockResponsePictures: string[] = ['url1', 'url2'];

  const pictureServiceStub = {
    carouselPictures$: of(mockResponsePictures)
  };

  const mockResponsePagination = { data: [
    productMock,
    productMock
  ]};

  const reviewServiceStub = {
    latestReviews$: of(mockResponse)
  };

  const mockResponseBestsellers = { data: [
    productMock,
    productMock
  ]};

  const productServiceStub = {
    getBestsellers: () => of(mockResponseBestsellers)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductService, 
        ReviewService,
        { provide: ReviewService, useValue: reviewServiceStub }
    ] 
    });
    service = TestBed.inject(HomeService);
    productService = TestBed.inject(ProductService); 
    reviewService = TestBed.inject(ReviewService);
  });

  it('should get categories', () => {
    service.getCategories();
    service.categories$.subscribe(response => {
      expect(response).toEqual(mockResponseCategory);
    });
  });

  it('should get carousel pictures', () => {
    service.getCarouselPictures();
    service.carouselPictures$.subscribe(response => {
      expect(response).toEqual(mockResponsePictures);
    });
  });

  it('should get bestsellers', () => {
    service.getBestsellers();
    service.bestsellerProducts$.subscribe(response => {
      expect(response).toEqual(mockResponseBestsellers.data);
    });
  });

 
  it('should get new products', () => {
    service.getNewProducts();
    service.newProducts$.subscribe(response => {
      expect(response).toEqual(mockResponsePagination.data);
    });
  });
  
  it('should get on sale products', () => {
    const mockResponse: IPagination<IProduct> = {
      pageIndex: 1,
      pageSize: 2,
      count: 2,
      data: [
        productMock,
        productMock
      ]
    };
  
    spyOn(productService, 'getOnSaleProducts').and.returnValue(of(mockResponse));
    service.getOnSaleProducts();
    service.onSaleProducts$.subscribe(response => {
      expect(response).toEqual(mockResponse.data);
    });
  });
  
  it('should get recently viewed products', () => {
    service.getRecentlyViewedProducts();
    service.recentlyViewedProducs$.subscribe(response => {
      expect(response).toEqual(mockResponseProduct);
    });
  });
  
  it('should get latest reviews', () => {
    service.getLatestReviews();
    service.latestReviews$.subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  });

});