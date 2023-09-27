import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICategory} from "../../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.baseUrl + 'category');
  }

  getCategoriesById(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(this.baseUrl + 'category/' + id);
  }

  createCategory(category: ICategory) {
    return this.http.post(this.baseUrl + 'category', category);
  }

  updateCategory(category: ICategory) {
    return this.http.put(this.baseUrl + 'category', category);
  }

  deleteCategory(id: number) {
    return this.http.delete(this.baseUrl + 'category/' + id);
  }
}
