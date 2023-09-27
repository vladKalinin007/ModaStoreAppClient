import {Inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  baseUrl: string = environment.apiUrl + 'pictures'

  constructor(private http: HttpClient) { }

  getCarouselPictures() {
    return this.http.get(`${this.baseUrl}/carousel`);
  }

}
