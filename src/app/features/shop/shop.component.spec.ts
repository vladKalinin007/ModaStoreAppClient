import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopComponent } from './shop.component';
import { ShopService } from './shop.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;
  let shopService: ShopService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ ShopComponent ],
      providers: [ShopService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    shopService = TestBed.inject(ShopService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts on init', () => {
    spyOn(component, 'getProducts');
    component.ngOnInit();
    expect(component.getProducts).toHaveBeenCalled();
  });

  it('should call getBrands on init', () => {
    spyOn(component, 'getBrands');
    component.ngOnInit();
    expect(component.getBrands).toHaveBeenCalled();
  });

  it('should call getTypes on init', () => {
    spyOn(component, 'getTypes');
    component.ngOnInit();
    expect(component.getTypes).toHaveBeenCalled();
  });

  it('should call getCategories on init', () => {
    spyOn(component, 'getCategories');
    component.ngOnInit();
    expect(component.getCategories).toHaveBeenCalled();
  });

  it('should call getSizes on init', () => {
    spyOn(component, 'getSizes');
    component.ngOnInit();
    expect(component.getSizes).toHaveBeenCalled();
  });

  it('should call getColors on init', () => {
    spyOn(component, 'getColors');
    component.ngOnInit();
    expect(component.getColors).toHaveBeenCalled();
  });

  it('should call getAttributes on init', () => {
    spyOn(component, 'getAttributes');
    component.ngOnInit();
    expect(component.getAttributes).toHaveBeenCalled();
  });

  it('should call onBrandSelected', () => {
    spyOn(component, 'onBrandSelected');
    component.onBrandSelected('1');
    expect(component.onBrandSelected).toHaveBeenCalledWith('1');
  });

  it('should call onTypeSelected', () => {
    spyOn(component, 'onTypeSelected');
    component.onTypeSelected('1');
    expect(component.onTypeSelected).toHaveBeenCalledWith('1');
  });

  it('should call onSortSelected', () => {
    spyOn(component, 'onSortSelected');
    component.onSortSelected('name');
    expect(component.onSortSelected).toHaveBeenCalledWith('name');
  });

  it('should call onPageChanged', () => {
    spyOn(component, 'onPageChanged');
    component.onPageChanged(1);
    expect(component.onPageChanged).toHaveBeenCalledWith(1);
  });

  it('should call onSearch', () => {
    spyOn(component, 'onSearch');
    component.onSearch();
    expect(component.onSearch).toHaveBeenCalled();
  });

  it('should call onReset', () => {
    spyOn(component, 'onReset');
    component.onReset();
    expect(component.onReset).toHaveBeenCalled();
  });
});
