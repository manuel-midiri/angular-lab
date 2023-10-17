import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): any {

    const token = this.authService.getToken();
    const refreshToken = this.authService.getRefreshToken();

    if (token) {
        request = request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token
            }
        });
    }

    if (!request.headers.has('Content-Type')) {
        request = request.clone({
            setHeaders: {
                'content-type': 'application/json'
            }
        });
    }

    request = request.clone({
        headers: request.headers.set('Accept', 'application/json')
    });

    return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                console.log('event--->>>', event);
            }
            return event;
        }),
        catchError((error: HttpErrorResponse) => {
            console.log(error.error.error);
            if (error.status === 401) {
                if (error.error.error === 'invalid_token') {
                    this.authService.refreshToken({ accessToken: token, refreshToken })
                        .subscribe(() => {
                            location.reload();
                        });
                } else {
                    this.router.navigate(['login']).then(_ => console.log('redirect to login'));
                }
            }
            return throwError(() => new Error(error.error.error));
        }));
}
}
