import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

let users = [
    { id: 1, username: 'owner', password: 'owner' }
];

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const body = request.body;

        // wrap in delayed observable to simulate server api call
        // of converts the arguments to an observable sequence
        return of(null)
            .pipe(mergeMap(authenticate))
            .pipe(delay(1000));

        function authenticate() {
            // check if credentials are correct
            const username = body.username;
            const password = body.password;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) {
                return throwError(() => new Error('Username o password errati.'));
            } else {
                let params = {
                    id: user.id,
                    username: user.username,
                    token: 'fake-jwt-token'
                };
                return of(new HttpResponse({ status: 200, body: params }))
            }
        }
    }
}

export const authenticationInterceptor = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
};