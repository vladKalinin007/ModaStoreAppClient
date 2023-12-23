import { productMock } from 'src/app/shared/mocks/product.mock';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ShopService } from "./shop.service";
import { TestBed } from "@angular/core/testing";
import { IPagination } from "src/app/core/models/pagination";
import { IProduct } from "src/app/core/models/product";
import { ShopParams } from "src/app/core/models/shopParams";
import { IProductReview } from 'src/app/core/models/catalog/product-review';
import { IProductColor } from 'src/app/core/models/catalog/product-color.interface';
import { IProductSize } from 'src/app/core/models/catalog/product-size.interface';
import { IType } from 'src/app/core/models/productType';
import { IBrand } from 'src/app/core/models/brand';

describe('ShopService', () => {
    let service: ShopService;
    let httpMock: HttpTestingController;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ShopService]
      });
  
      service = TestBed.inject(ShopService);
      httpMock = TestBed.inject(HttpTestingController);
    });
  
    afterEach(() => {
      httpMock.verify();
    });

    it('should fetch products', () => {
        const mockProducts: IPagination<IProduct> = {
            pageIndex: 1,
            pageSize: 1,
            count: 1,
            data: [productMock]
        };
    
        const mockParams = new ShopParams();
        mockParams.categoryId = '1';
        mockParams.category = 'Test Category';
        mockParams.brandId = '1';
        mockParams.typeId = '1';
        mockParams.sort = 'name';
        mockParams.colorId = '1';
        mockParams.pattern = 'Test Pattern';
        mockParams.sizeId = '1';
        mockParams.material = 'Test Material';
        mockParams.price = '100';
        mockParams.style = 'Test Style';
        mockParams.season = 'Test Season';
        mockParams.pageNumber = 1;
        mockParams.pageSize = 1;
        mockParams.search = 'Test';
        mockParams.minPrice = '50';
        mockParams.maxPrice = '150';
    
        service.getProducts(mockParams).subscribe(products => {
          expect(products).toEqual(mockProducts);
        });
    
        const req = httpMock.expectOne(req => req.url.startsWith(`${service.baseUrl}products`) && req.method === 'GET');
        expect(req.request.method).toBe('GET');
        req.flush(mockProducts);
    });
    
    it('should fetch product by id', () => {
        const mockProduct: IProduct = productMock;
      
        const existingId: string = '0c4e2990-d2b0-41a8-be5c-dd0dc077f0b7'; 
      
        service.getProductById(existingId).subscribe(product => {
          expect(product).toEqual(mockProduct);
        });
      
        const req = httpMock.expectOne(`${service.baseUrl}products?id=${existingId}`);
        expect(req.request.method).toBe('GET');
        req.flush({data: [mockProduct]});
    });

    it('should fetch product reviews', () => {
        const mockReviews: IProductReview[] = [
            {
              id: '1',
              rating: 5,
              comment: 'Great product!',
              productId: '0c4e2990-d2b0-41a8-be5c-dd0dc077f0b7',
              userId: 'user1',
              productName: 'Product 1',
              userName: 'User 1',
              pictureUrl: 'http://example.com/product1.jpg',
              createdOnUtc: new Date('2022-01-01T00:00:00Z')
            },
            {
              id: '2',
              rating: 4,
              comment: 'Good product!',
              productId: '0c4e2990-d2b0-41a8-be5c-dd0dc077f0b8',
              userId: 'user2',
              productName: 'Product 2',
              userName: 'User 2',
              pictureUrl: 'http://example.com/product2.jpg',
              createdOnUtc: new Date('2022-01-02T00:00:00Z')
            }
        ];

        const productId = '0c4e2990-d2b0-41a8-be5c-dd0dc077f0b7';
      
        service.getReviewsForProduct(productId).subscribe(reviews => {
          expect(reviews).toEqual(mockReviews);
        });
      
        const req = httpMock.expectOne(`${service.baseUrl}reviews/products/${productId}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockReviews);
    });
      
      it('should fetch types', () => {
        const mockTypes: IType[] = [
          { id: '1', name: 'Type 1', description: 'Description 1' },
          { id: '2', name: 'Type 2', description: 'Description 2' }
        ];
        const name = 'category1';
      
        service.getTypes(name).subscribe(types => {
          expect(types).toEqual(mockTypes);
        });
      
        const req = httpMock.expectOne(`${service.baseUrl}productTypes/category/${name}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockTypes);
      });
      
      it('should fetch sizes', () => {
        const mockSizes: IProductSize[] = [
          { id: '1', name: 'Size 1' },
          { id: '2', name: 'Size 2' }
        ];
        const name = 'product1';
      
        service.getSizes(name).subscribe(sizes => {
          expect(sizes).toEqual(mockSizes);
        });
      
        const req = httpMock.expectOne(`${service.baseUrl}products/sizes/${name}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockSizes);
      });
      
      it('should fetch colors', () => {
        const mockColors: IProductColor[] = [
          { id: '1', name: 'Color 1', colorCode: '#FFFFFF' },
          { id: '2', name: 'Color 2', colorCode: '#000000' }
        ];
        const name = 'product1';
      
        service.getColors(name).subscribe(colors => {
          expect(colors).toEqual(mockColors);
        });
      
        const req = httpMock.expectOne(`${service.baseUrl}products/colors/${name}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockColors);
      });
  
  });