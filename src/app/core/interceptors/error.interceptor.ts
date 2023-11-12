// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import {catchError, delay, Observable, throwError} from 'rxjs';
// import {NavigationExtras, Router} from "@angular/router";
// import {ToastrService} from "ngx-toastr";
// import { MessageService } from 'primeng/api';

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {

//   constructor(private router: Router, private toastr: ToastrService, private messageService: MessageService,) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     return next.handle(request).pipe(
//       catchError(error => {
//         if (error)  {
//           if (error.status === 400) {
//             if (error.error.errors) {
//               // throw error.error;
//               console.log(`Error code 400: ${error.error.errors}`);
//               // console.log(error.error);
//             } else {
//               // this.toastr.error(error.error.message, error.error.statusCode);
//               console.log(error.error.message);
              
//             }
//           }
//           if (error.status === 401) {
//             console.log(`Error code 401: ${error.error.errors}`);
//           }
//           if (error.status === 404) {
//             console.log(`Error code 404: ${error.error.errors}`);
//           }
//           if (error.status === 500) {
//             console.log(`Error code 500: ${error.error.errors}`);
//             // const navigationExtras: NavigationExtras = {state: {error: error.error}};
//             // this.router.navigateByUrl('/server-error', navigationExtras);
//           }
//         }
//         return throwError(error);
//       })
//     );
//   }
// }
