import { Injectable, inject } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { ICategory } from 'src/app/core/models/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly #http = inject(HttpClient);

  BASE_URL: string = environment.apiUrl + 'categories';
  categories$: Observable<ICategory[]>;

  constructor() {
    this.getCategories();
  }

  getCategories(): void {
    this.categories$ = this.#http.get<ICategory[]>(this.BASE_URL);
  }

  getCategoriesDirectly(): Observable<ICategory[]> {
    return this.#http.get<ICategory[]>(this.BASE_URL);
  }

  getCategoriesById(id: string): Observable<ICategory> {
    return this.#http.get<ICategory>(this.BASE_URL + id);
  }

  createCategory(category: ICategory) {
    return this.#http.post(this.BASE_URL + 'categories', category);
  }

  updateCategory(category: ICategory) {
    return this.#http.put(this.BASE_URL + 'categories', category);
  }

  deleteCategory(id: string) {
    return this.#http.delete(this.BASE_URL + id);
  }
}
