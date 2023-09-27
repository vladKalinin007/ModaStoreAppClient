import {Injectable, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ICategory} from "../../core/models/category";
import {Observable} from "rxjs";
import {CategoryService} from "../../core/services/category.service/category.service";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) { }

  getCategories(): Observable<ICategory[]> {
    return this.categoryService.getCategories();
  }

}
