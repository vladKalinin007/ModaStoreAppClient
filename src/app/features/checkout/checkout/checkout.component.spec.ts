import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { AccountService } from '../../account/account.service';
import { BasketService } from '../../basket/basket.service';
import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let mockAccountService;
  let mockBasketService;

  beforeEach(async () => {
    mockAccountService = jasmine.createSpyObj(['getUserAddress']);
    mockBasketService = jasmine.createSpyObj(['getCurrentBasketValue']);

    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      providers: [
        FormBuilder,
        { provide: AccountService, useValue: mockAccountService },
        { provide: BasketService, useValue: mockBasketService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create checkout form', () => {
    component.createCheckoutForm();
    expect(component.checkoutForm).toBeTruthy();
  });

  it('should set address form values', () => {
    const mockAddress = {
      firstName: 'John',
      lastName: 'Doe',
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345'
    };
    mockAccountService.getUserAddress.and.returnValue({ subscribe: callback => callback(mockAddress) });
    component.getAddressFormValues();
    expect(component.checkoutForm.get('addressForm').value).toEqual(mockAddress);
  });

  it('should set delivery method value', () => {
    const mockBasket = { deliveryMethodId: 1 };
    mockBasketService.getCurrentBasketValue.and.returnValue(mockBasket);
    component.getDeliveryMethodValue();
    expect(component.checkoutForm.get('deliveryForm').get('deliveryMethod').value).toEqual('1');
  });
});
