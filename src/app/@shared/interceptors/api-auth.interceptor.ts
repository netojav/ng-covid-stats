import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

export class ApiAuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = request.headers
      .set('X-RapidAPI-Host', environment.host)
      .set('X-RapidAPI-Key', environment.key);
    const authRequest = request.clone({ headers });

    return next.handle(authRequest);
  }
}
