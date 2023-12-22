import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';
import { IOrder } from 'src/app/core/models/order';
import { BasketService } from 'src/app/features/basket/basket.service';
import { IBasket } from 'src/app/core/models/basket';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;
  let basketService: BasketService;
  let mockOrder: IOrder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService, BasketService]
    });

    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
    basketService = TestBed.inject(BasketService);

    mockOrder = {
        id: 'test-id',
        buyerEmail: 'test@test.com',
        orderDate: new Date(),
        shipToAddress: {
          firstName: 'Test',
          lastName: 'User',
          street: '123 Test St',
          city: 'Test City',
          state: 'Test State',
          zipCode: '12345'
        },
        deliveryMethod: 'test method',
        shippingPrice: 10,
        orderItems: [
          {
            id: 'item-id',
            itemOrdered_ProductName: 'Test Item',
            itemOrdered_PictureUrl: 'test.jpg',
            itemOrdered_ProductItemId: 'product-id',
            price: 50,
            quantity: 2
          }
        ],
        subtotal: 100,
        total: 110,
        status: 'test status'
      };
  });

  it('should get user orders', () => {
    const mockOrders = [mockOrder];

    service.getUserOrders().subscribe(orders => {
      expect(orders).toEqual(mockOrders);
    });

    const req = httpMock.expectOne(`${service.url}orders`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);
  });

  it('should add user order', () => {
    const mockBasket = { id: 'test-basket-id' } as IBasket
    spyOn(basketService, 'getCurrentBasketValue').and.returnValue(mockBasket);

    service.addUserOrder().subscribe(order => {
      expect(order).toEqual(mockOrder);
    });

    const req = httpMock.expectOne(`${service.url}order/${mockBasket.id}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockOrder);
  });

  afterEach(() => {
    httpMock.verify();
  });
});