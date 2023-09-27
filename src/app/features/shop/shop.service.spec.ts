import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ShopService } from './shop.service';
import {IPagination} from "../../core/models/pagination";
import {IProduct} from "../../core/models/product";
import {ShopParams} from "../../core/models/shopParams";

describe('ShopService', () => {
  let shopService: ShopService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShopService]
    });

    shopService = TestBed.inject(ShopService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const mockShopParams: ShopParams  = {
    brandId: "0b934806-f84e-4d7c-b45e-300575f98ed0",
    typeId: "0b934806-f84e-4d7c-b45e-300575f98ed1",
    search: "test",
    sort: "name",
    pageNumber: 1,
    pageSize: 10
  }

  const mockResponse: IPagination = {
    pageIndex: 1,
    pageSize: 10,
    count: 2,
    data: [
      {
        id: '0b934806-f84e-4d7c-b45e-300575f98ed0',
        name: 'big white dress' ,
        description: 'Fusce posuere, magna sed pulvinar ultricies, purus lectus.',
        price: 10,
        pictureUrl: 'images/products/hat-react2.png',
        productType: 'Dress',
        productBrand: 'Gucci'
      },
      {
        id: '0b934806-f84e-4d7c-b45e-300575f98ed1',
        name: 'big white dress',
        description: 'Fusce posuere, magna sed pulvinar ultricies, purus lectus.',
        price: 10,
        pictureUrl: 'images/products/hat-react2.png',
        productType: 'Dress',
        productBrand: 'Gucci'
      }
    ]
  }

  const mockProductId: string = '0b934806-f84e-4d7c-b45e-300575f98ed0';

  const mockProduct: IProduct = {
    id: '0b934806-f84e-4d7c-b45e-300575f98ed0',
    name: 'big white dress' ,
    description: 'Fusce posuere, magna sed pulvinar ultricies, purus lectus.',
    price: 10,
    pictureUrl: 'images/products/hat-react2.png',
    productType: 'Dress',
    productBrand: 'Gucci'
  }

  it('should get a list of parametrized products', () => {

    shopService.getProducts(mockShopParams)
      .subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: (error) => {
          console.log(error);
        }
      });

    const req = httpMock.expectOne(`${shopService.baseUrl}product?brandId=1&typeId=2&search=test&sort=name&pageIndex=1&pageSize=10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get a product by id', () => {

    shopService.getProduct(mockProductId)
      .subscribe({
      next: (response) => {
        expect(response).toEqual(mockProduct);
      },
      error: (error) => {
        console.log(error);
      }
    });

    const req = httpMock.expectOne(`${shopService.baseUrl}product/${mockProductId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should retrieve brands', () => {
    const mockResponse = [{ id: '1', name: 'Brand 1' }, { id: '2', name: 'Brand 2' }];

    shopService.getBrands().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${shopService.baseUrl}productBrand`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should retrieve types', () => {
    const mockResponse = [{ id: 1, name: 'Type 1' }, { id: 2, name: 'Type 2' }];

    shopService.getTypes().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${shopService.baseUrl}productType`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
