import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HistoryService } from './history.service';
import { ProductService } from '../product-service/product.service';
import { IProduct } from 'src/app/core/models/product';
import { ISeenProductList } from 'src/app/core/models/customer/seenProductList';
import { productMock } from '../../mocks/product.mock';

describe('HistoryService', () => {
  let service: HistoryService;
  let httpMock: HttpTestingController;
  let productService: ProductService;
  let mockSeenProductList: ISeenProductList;
  let mockProduct: IProduct;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HistoryService, ProductService]
    });

    service = TestBed.inject(HistoryService);
    httpMock = TestBed.inject(HttpTestingController);
    productService = TestBed.inject(ProductService);

    mockSeenProductList = {
      id: 'test-id',
      seenProductsIds: ['product-id']
    };

    mockProduct = productMock;
  });

  it('should set history', () => {
    spyOn(service, 'setHistory').and.callThrough();

    service.setHistory();

    const req = httpMock.expectOne(`${service.BASE_URL}seen-product`);
    expect(req.request.method).toBe('POST');
    req.flush(mockSeenProductList);
    expect(service.setHistory).toHaveBeenCalled();
  });

  it('should update history', () => {
    spyOn(service, 'updateHistory').and.callThrough();

    service.updateHistory('product-id');

    expect(service.updateHistory).toHaveBeenCalledWith('product-id');
    expect(service.setHistory).toHaveBeenCalled();
  });

  afterEach(() => {
    httpMock.verify();
  });
});