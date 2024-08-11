import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

let users = [
    { id: 1, username: 'owner1', password: 'owner1' },
    { id: 2, username: 'owner2', password: 'owner2' },
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        // of converts the arguments to an observable sequence
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(delay(500));

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        function authenticate() {
            const { username, password } = body;
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

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};