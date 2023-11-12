import {Inject, Injectable, inject} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  readonly #http = inject(HttpClient);

  BASE_URL: string = environment.apiUrl + 'pictures'
  carouselPictures$: Observable<string[]>;

  constructor() { 
    this.getCarouselPictures();
  }

  getCarouselPictures() {
    this.carouselPictures$ = this.#http.get<string[]>(`${this.BASE_URL}/carousel`);
    console.log(`BASE_URL = ${this.BASE_URL}/carousel`)
    console.log(`carouselPictures$ = ${this.carouselPictures$}`)
  }
}
