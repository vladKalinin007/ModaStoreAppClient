import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

const transferStateCache: String[] = [];

@Injectable()
export class TransferStateService {

  readonly #transferState = inject(TransferState);
  readonly #platformId = inject(PLATFORM_ID);

  setCache(key: string, data: any) {
    if (!isPlatformBrowser(this.#platformId)) {
      transferStateCache[key] = makeStateKey<any>(key);
      this.#transferState.set(transferStateCache[key], data);
    }
  }

  getCache(key: string): any {
    if (isPlatformBrowser(this.#platformId)) {
      const cachedData: any = this.#transferState['store'][key];
      delete this.#transferState['store'][key];
      return cachedData;
    }
  }
}


