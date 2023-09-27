import {Component, Input} from '@angular/core';
import {cascade, fadeIn} from "../../animations/fade-in.animation";

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
  animations: [
    fadeIn,
    cascade
  ]
})
export class EmptyComponent {

  @Input()
  public placeholderMessage: string;

  @Input()
  public placeholderIcon: string;

}
