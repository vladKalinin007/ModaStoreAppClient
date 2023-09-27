import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CheckoutService } from './checkout.service';
import { environment } from '../../../environments/environment';
import { IDeliveryMethod } from '../../core/models/deliveryMethod';
import { IOrderToCreate } from '../../core/models/order';

describe('CheckoutService', () => {
  let service: CheckoutService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CheckoutService]
    });
    service = TestBed.inject(CheckoutService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createOrder', () => {
    it('should send a POST request to create an order', () => {
      // create some mock order data
      const order: IOrderToCreate = {
        basketId: 'basket1',
        deliveryMethodId: "1",
        shipToAddress: {
          firstName: 'John',
          lastName: 'Johnson',
          street: 'Brodway 5',
          city: 'New York',
          state: 'NY',
          zipCode: '10001'
        }
      };
      service.createOrder(order).subscribe(response => {
        expect(response).toBeTruthy();
      });
      const req = httpMock.expectOne(apiUrl + 'orders');
      expect(req.request.method).toBe('POST');
      req.flush({ id: 1, buyerEmail: '', orderDate: '', shipToAddress: {}, deliveryMethod: '', shippingPrice: 0, orderItems: [], subtotal: 0, total: 0, status: '' });
    });
  });

  describe('getDeliveryMethods', () => {

    it('should send a GET request to fetch delivery methods', () => {
      const mockDeliveryMethods: IDeliveryMethod[] = [
        { id: "1", shortName: 'test1', deliveryTime: '1', description: 'test1', price: 5 },
        { id: "2", shortName: 'test2', deliveryTime: '2', description: 'test2', price: 10 },
        { id: "3", shortName: 'test3', deliveryTime: '3', description: 'test3', price: 15 },
      ];
      service.getDeliveryMethods().subscribe(deliveryMethods => {
        expect(deliveryMethods).toEqual(mockDeliveryMethods);
      });
      const req = httpMock.expectOne(apiUrl + 'orders/deliveryMethods');
      expect(req.request.method).toBe('GET');
      req.flush(mockDeliveryMethods);
    });

    it('should sort delivery methods by price in descending order', () => {
      const mockDeliveryMethods: IDeliveryMethod[] = [
        { id: "1", shortName: 'test1', deliveryTime: '1', description: 'test1', price: 5 },
        { id: "2", shortName: 'test2', deliveryTime: '2', description: 'test2', price: 10 },
        { id: "3", shortName: 'test3', deliveryTime: '3', description: 'test3', price: 15 },
      ];
      const sortedDeliveryMethods = mockDeliveryMethods.slice().sort((a, b) => b.price - a.price);
      service.getDeliveryMethods().subscribe(deliveryMethods => {
        expect(deliveryMethods).toEqual(sortedDeliveryMethods);
      });
      const req = httpMock.expectOne(apiUrl + 'orders/deliveryMethods');
      expect(req.request.method).toBe('GET');
      req.flush(mockDeliveryMethods);
    });
  });

});
