import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemsCarouselComponent } from './product-items-carousel.component';

describe('ProductItemsCarouselComponent', () => {
  let component: ProductItemsCarouselComponent;
  let fixture: ComponentFixture<ProductItemsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductItemsCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductItemsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
