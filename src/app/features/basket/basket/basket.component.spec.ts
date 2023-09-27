import {BasketComponent} from "./basket.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {IBasketItem} from "../../../core/models/basket";
import {BasketService} from "../basket.service";

describe('BasketComponent', () => {

  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let basketService: jasmine.SpyObj<BasketService>;

  beforeEach(async () => {

    const basketServiceSpy = jasmine.createSpyObj('BasketService', ['removeItemFromBasket']);

    await TestBed.configureTestingModule({
      declarations: [BasketComponent],
      providers: [{provide: BasketService, useValue: basketServiceSpy}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have a basket$ property', () => {
    expect(component.basket$).toBeDefined();
  });

  it('should have a basketTotal$ property', () => {
    expect(component.basketTotal$).toBeDefined();
  });

  /*it('should have a onCloseClick method', () => {
    expect(component.onCloseClick).toBeDefined();
  });*/

  it('should remove an item from the basket', () => {

    const item: IBasketItem = {
      id: "1",
      productName: 'Test Product',
      price: 10,
      quantity: 1,
      pictureUrl: 'test.jpg',
      brand: 'Test Brand',
      type: 'Test Type'
    };

    component.removeBasketItem(item);

    expect(basketService.removeItemFromBasket).toHaveBeenCalledWith(item);

  });

})
