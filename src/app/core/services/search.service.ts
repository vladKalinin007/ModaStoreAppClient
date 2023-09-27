import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.prod";


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl: string = environment.apiUrl

  constructor(private http: HttpClient) {}

  search(productName: string): Observable<any> {
    let query: string = this.baseUrl + 'Product?Search=' + productName;

    return this.http.get(query);
  }


}
