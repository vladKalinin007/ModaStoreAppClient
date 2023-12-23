import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DeliveryService } from './delivery.service';
import { of } from 'rxjs';
import { IDeliveryMethod } from 'src/app/core/models/deliveryMethod';
import { BasketService } from 'src/app/features/basket/basket.service';
import { IBasket } from 'src/app/core/models/basket';

describe('DeliveryService', () => {
  let service: DeliveryService;
  let httpMock: HttpTestingController;
  let basketService: BasketService;
  let mockDeliveryMethod: IDeliveryMethod;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeliveryService, BasketService]
    });

    service = TestBed.inject(DeliveryService);
    httpMock = TestBed.inject(HttpTestingController);
    basketService = TestBed.inject(BasketService);

    mockDeliveryMethod = {
      shortName: 'Test',
      deliveryTime: '1-2 days',
      description: 'Test delivery method',
      price: 10,
      id: 'test-id'
    };
  });

  it('should set shipping price', () => {
    const mockBasket: IBasket = {
        id: 'basket-id',
        items: [],
        deliveryMethodId: '',
        shippingPrice: 0
    };
    spyOn(basketService, 'getCurrentBasketValue').and.returnValue(mockBasket);
    spyOn(basketService, 'calculateTotals');
    spyOn(basketService, 'setBasket');

    service.setShippingPrice(mockDeliveryMethod);

    expect(service.deliveryMethodId).toBe('test-id');
    expect(service.shipping).toBe(10);
    expect(basketService.calculateTotals).toHaveBeenCalled();
    expect(basketService.setBasket).toHaveBeenCalled();
  });

  it('should get delivery methods', () => {
    const mockDeliveryMethods = [mockDeliveryMethod];

    service.getDeliveryMethods().subscribe(deliveryMethods => {
      expect(deliveryMethods).toEqual(mockDeliveryMethods);
    });

    const req = httpMock.expectOne(service.baseUrl + 'deliveryMethods');
    expect(req.request.method).toBe('GET');
    req.flush(mockDeliveryMethods);
  });

  afterEach(() => {
    httpMock.verify();
  });
});