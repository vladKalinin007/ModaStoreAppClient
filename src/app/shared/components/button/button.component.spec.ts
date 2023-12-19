import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit buttonClicked event when button is clicked and not disabled', () => {
    component.disabled = false;
    spyOn(component.buttonClicked, 'emit');

    component.handleClick();

    expect(component.buttonClicked.emit).toHaveBeenCalled();
  });

  it('should not emit buttonClicked event when button is clicked and disabled', () => {
    component.disabled = true;
    spyOn(component.buttonClicked, 'emit');

    component.handleClick();

    expect(component.buttonClicked.emit).not.toHaveBeenCalled();
  });

  it('should correctly assign input properties', () => {
    component.buttonStyle = 'test-style';
    component.buttonName = 'test-name';
    component.disabled = true;
    component.showIcon = true;
    component.iconClass = 'test-icon';
    component.productId = 'test-id';

    expect(component.buttonStyle).toBe('test-style');
    expect(component.buttonName).toBe('test-name');
    expect(component.disabled).toBe(true);
    expect(component.showIcon).toBe(true);
    expect(component.iconClass).toBe('test-icon');
    expect(component.productId).toBe('test-id');
  });

  it('should display the correct button name', () => {
    component.buttonName = 'Test Button';
    fixture.detectChanges();
  
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent).toContain('Test Button');
  });

  it('should emit buttonClicked when button is clicked', () => {
    spyOn(component.buttonClicked, 'emit');
    
    const buttonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();
    
    expect(component.buttonClicked.emit).toHaveBeenCalled();
  });

});