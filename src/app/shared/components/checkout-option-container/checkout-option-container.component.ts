import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-checkout-option-container',
  templateUrl: './checkout-option-container.component.html',
  styleUrls: ['./checkout-option-container.component.scss']
})
export class CheckoutOptionContainerComponent {

  @Input() title: string;
  @Input() informer: string;

}
