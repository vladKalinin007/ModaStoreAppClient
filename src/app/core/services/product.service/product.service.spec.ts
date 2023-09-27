import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import {IType} from "../../models/productType";
import {IBrand} from "../../models/brand";
import {IProduct} from "../../models/product";
import {ShopParams} from "../../models/shopParams";

describe('ProductService', () => {

  let productService: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    productService = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve products', () => {

    // Arrange
    const mockProducts: IProduct[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        price: 10,
        pictureUrl: 'url1',
        productType: 'Type 1',
        productBrand: 'Brand 1'
      },
      { id: '2', name: 'Product 2', description: 'Description 2', price: 20, pictureUrl: 'url2', productType: 'Type 2', productBrand: 'Brand 2' }
    ];

    const mockShopParams: ShopParams = {
      brandId: '1',
      typeId: '2',
      search: 'test',
      sort: 'name',
      pageNumber: 1,
      pageSize: 10
    };

    // Act
    productService.getProducts(mockShopParams).subscribe((pagination) => {
      expect(pagination.data).toEqual(mockProducts);
    });


    const req = httpMock.expectOne(`${productService.baseUrl}products?brandId=1&typeId=2&search=test&sort=name&pageIndex=1&pageSize=10`);
    expect(req.request.method).toBe('GET');
    req.flush({ body: mockProducts });
  });

  it('should retrieve a product by id', () => {
    const mockProduct: IProduct = { id: '1', name: 'Product 1', description: 'Description 1', price: 10, pictureUrl: 'url1', productType: 'Type 1', productBrand: 'Brand 1' };
    const mockProductId = 1;

    productService.getProduct(mockProductId).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${productService.baseUrl}product/${mockProductId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should retrieve brands', () => {
    const mockBrands: IBrand[] = [{ id: '1', name: 'Brand 1' }, { id: '2', name: 'Brand 2' }];

    productService.getBrands().subscribe((brands) => {
      expect(brands).toEqual(mockBrands);
    });

    const req = httpMock.expectOne(`${productService.baseUrl}productBrand/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBrands);
  });

  it('should retrieve types', () => {
    const mockTypes: IType[] = [{ id: 1, name: 'Type 1' }, { id: 2, name: 'Type 2' }];

    productService.getTypes().subscribe((types) => {
      expect(types).toEqual(mockTypes);
    });

    const req = httpMock.expectOne(`${productService.baseUrl}productType/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTypes);
  });
});

