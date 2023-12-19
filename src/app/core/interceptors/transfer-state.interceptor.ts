import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { TransferStateService } from '../services/transfer-state-service/transfer-state.service';

@Injectable()
export class TransferStateInterceptor implements HttpInterceptor {

  readonly #transferStateService = inject(TransferStateService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const cachedResponse = this.#transferStateService.getCache(req.url);
    if (cachedResponse) {
      return of(new HttpResponse<any>({ body: cachedResponse }));
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.#transferStateService.setCache(req.url, event.body);
        }
      })
    );
  }
}
