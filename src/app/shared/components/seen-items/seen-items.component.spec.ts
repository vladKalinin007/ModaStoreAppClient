import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeenItemsComponent } from './seen-items.component';

describe('ViewedItemsComponent', () => {
  let component: SeenItemsComponent;
  let fixture: ComponentFixture<SeenItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeenItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeenItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
