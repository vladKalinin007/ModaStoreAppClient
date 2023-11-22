import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  setItem(key: string, data: any): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log(`SET ITEM. key: ${key}, data: ${data}`)
      localStorage.setItem(key, data);
    }
  }

  getItem(key: string): any {
    if (isPlatformBrowser(this.platformId)) {
      const item = localStorage.getItem(key);
      return localStorage.getItem(key);
    }
    return null;
  }

  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }
}