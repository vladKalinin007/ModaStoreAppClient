import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav-modal',
  templateUrl: './nav-modal.component.html',
  styleUrls: ['./nav-modal.component.scss']
})
export class NavModalComponent  {


  @Input()
  isMenuActive: boolean = true;
  isModalOpen = false; 

  // ngOnInit(): void {
  //   this.isModalOpen = true;
  // }

  // ngOnDestroy(): void {
  //   this.isModalOpen = false;
  // }


}
