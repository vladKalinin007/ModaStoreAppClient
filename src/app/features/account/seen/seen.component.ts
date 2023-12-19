import {Component, OnInit} from '@angular/core';
import {HistoryService} from "../../../shared/services/history-service/history.service";
import {Observable} from "rxjs";
import {ISeenProductList} from "../../../core/models/customer/seenProductList";
import {IProduct} from "../../../core/models/product";

@Component({
  selector: 'app-seen',
  templateUrl: './seen.component.html',
  styleUrls: ['./seen.component.scss']
})
export class SeenComponent implements OnInit {

    seenProducts$: Observable<IProduct[]>

    constructor(private historyService: HistoryService) {

    }

    ngOnInit(): void {
      this.seenProducts$ = this.historyService.product$;
    }

}
