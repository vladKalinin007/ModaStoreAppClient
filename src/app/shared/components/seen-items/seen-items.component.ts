import {Component, Input, OnInit} from '@angular/core';
import {HistoryService} from "../../services/history.service";
import {IProduct} from "../../../core/models/product";
import {Observable} from "rxjs";
import {ISeenProductList} from "../../../core/models/customer/seenProductList";

@Component({
  selector: 'app-seen-items',
  templateUrl: './seen-items.component.html',
  styleUrls: ['./seen-items.component.scss']
})
export class SeenItemsComponent implements OnInit {

  @Input() title: string;

  history$: Observable<ISeenProductList>


  constructor(
    private historySevice: HistoryService
  ) {}

  ngOnInit(): void {
    this.history$ = this.historySevice.history$;
    console.log("HISTORY: ", this.history$);
  }


}
