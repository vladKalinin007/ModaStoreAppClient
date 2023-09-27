import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-nav-modal',
  templateUrl: './nav-modal.component.html',
  styleUrls: ['./nav-modal.component.scss']
})
export class NavModalComponent {

  @Input()
  isMenuActive: boolean = true;

}
