import { productMock } from './../../mocks/product.mock';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { IPagination } from 'src/app/core/models/pagination';
import { ShopParams } from 'src/app/core/models/shopParams';
import { IProduct } from 'src/app/core/models/product';
import { IBrand } from 'src/app/core/models/brand';
import { IType } from 'src/app/core/models/productType';
import { IProductAttribute } from 'src/app/core/models/catalog/product-attribute.interface';
import { IProductColor } from 'src/app/core/models/catalog/product-color.interface';
import { IProductSize } from 'src/app/core/models/catalog/product-size.interface';


describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should get products', () => {
    const mockResponse: IPagination<IProduct> = {
      pageIndex: 1,
      pageSize: 10,
      count: 100,
      data: []
    };
  
    service.getProducts(new ShopParams()).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(req => req.url.includes(service.BASE_URL) && req.method === 'GET');
    expect(req.request.params.get('sort')).toBe('name');
    expect(req.request.params.get('pageIndex')).toBe('1');
    expect(req.request.params.get('pageSize')).toBe('9');
    req.flush(mockResponse);
  });

  it('should get bestsellers', () => {
    const mockResponse: IPagination<IProduct> = {
      pageIndex: 1,
      pageSize: 10,
      count: 100,
      data: []
    };
  
    service.getBestsellers(10).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(req => req.url.includes(service.BASE_URL) && req.method === 'GET');
    expect(req.request.params.get('isBestseller')).toBe('true');
    expect(req.request.params.get('pageSize')).toBe('10');
    req.flush(mockResponse);
  });

  it('should get new products', () => {
    const mockResponse: IPagination<IProduct> = {
      pageIndex: 1,
      pageSize: 10,
      count: 100,
      data: []
    };
  
    service.getNewProducts(10).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(req => req.url.includes(service.BASE_URL) && req.method === 'GET');
    expect(req.request.params.get('isNew')).toBe('true');
    expect(req.request.params.get('pageSize')).toBe('10');
    req.flush(mockResponse);
  });

  it('should get on sale products', () => {
    const mockResponse: IPagination<IProduct> = {
      pageIndex: 1,
      pageSize: 10,
      count: 100,
      data: []
    };
  
    service.getOnSaleProducts(10).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(req => req.url.includes(service.BASE_URL) && req.method === 'GET');
    expect(req.request.params.get('isOnSale')).toBe('true');
    expect(req.request.params.get('pageSize')).toBe('10');
    req.flush(mockResponse);
  });

  it('should get a product', () => {
    const mockResponse: IPagination<IProduct> = {
      pageIndex: 1,
      pageSize: 1,
      count: 1,
      data: [productMock]
    };
  
    const productId = 'testId';
    service.getProduct(productId).subscribe(response => {
      expect(response).toEqual(mockResponse.data[0]);
    });
  
    const req = httpMock.expectOne(`${service.BASE_URL}?id=${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get related products', () => {
    const mockResponses: IPagination<IProduct>[] = [
      {
        pageIndex: 1,
        pageSize: 1,
        count: 1,
        data: [productMock]
      },
      {
        pageIndex: 1,
        pageSize: 1,
        count: 1,
        data: [productMock]
      }
    ];
  
    const productIds = ['testId1', 'testId2'];
    service.getRelatedProducts(productIds).subscribe(response => {
      expect(response).toEqual([mockResponses[0].data[0], mockResponses[1].data[0]]);
    });
  
    const reqs = httpMock.match(req => req.url.includes(service.BASE_URL) && req.method === 'GET');
    expect(reqs.length).toBe(2);
    reqs[0].flush(mockResponses[0]);
    reqs[1].flush(mockResponses[1]);
  });

  it('should get brands', () => {
    const mockResponse: IBrand[] = [
        { id: '1', name: 'Brand 1' },
        { id: '2', name: 'Brand 2' }
      ];
  
    service.getBrands().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(service.BASE_URL + 'productBrand/');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  
  it('should get types', () => {
    const mockResponse: IType[] = [
        { id: '1', name: 'Brand 1', description: 'Description 1' },
        { id: '2', name: 'Brand 2', description: 'Description 2' }
    ];
  
    service.getTypes().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(service.BASE_URL + 'productType/');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get products by category', () => {
    const mockResponse: IProduct[] = [
      productMock,
      productMock
    ];
  
    const categoryName = 'testCategory';
    service.getProductsByCategory(categoryName).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(`${service.BASE_URL}products?categoryName=${categoryName}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get sizes', () => {
    const mockResponse: IProductSize[] = [
      { id: '1', name: 'Size 1' },
      { id: '2', name: 'Size 2' }
    ];
  
    const category = 'testCategory';
    service.getSizes(category).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(service.BASE_URL + '/sizes/' + category);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  
  it('should get colors', () => {
    const mockResponse: IProductColor[] = [
      { id: '1', name: 'Color 1', colorCode: '#FFFFFF' },
      { id: '2', name: 'Color 2', colorCode: '#000000' }
    ];
  
    const category = 'testCategory';
    service.getColors(category).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(service.BASE_URL + '/colors/' + category);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  
  it('should get attributes', () => {
    const mockResponse: IProductAttribute = {
      materials: ['Material 1', 'Material 2'],
      styles: ['Style 1', 'Style 2'],
      patterns: ['Pattern 1', 'Pattern 2'],
      seasons: ['Season 1', 'Season 2']
    };
  
    const category = 'testCategory';
    service.getAttributes(category).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(service.BASE_URL + '/attributes/' + category);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });
});