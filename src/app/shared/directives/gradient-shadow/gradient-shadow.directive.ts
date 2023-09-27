import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[gradientShadow]'
})
export class GradientShadowDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.addGradientShadow();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
  }

  private addGradientShadow() {
    // const gradient: string = 'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)';
    // this.renderer.setStyle(this.el.nativeElement, 'box-shadow', `1px 1px 4px ${gradient}`);
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }

}
