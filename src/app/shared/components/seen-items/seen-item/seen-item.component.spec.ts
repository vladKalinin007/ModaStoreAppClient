import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewedItemComponent } from './seen-item.component';

describe('ViewedItemComponent', () => {
  let component: ViewedItemComponent;
  let fixture: ComponentFixture<ViewedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewedItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
