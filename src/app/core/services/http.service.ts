import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from './auth.service';

@Injectable()
export class HttpService extends Http {

  private authService: AuthService;

  constructor(
    backend: XHRBackend,
    options: RequestOptions,
    authService: AuthService
  ) {
    let token = authService.getToken(); // your custom token getter function here
    options.headers.set('Authorization', token);
    super(backend, options);

    this.authService = authService;
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    let token = this.authService.getToken();

    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = { headers: new Headers() };
      }
      options.headers.set('Authorization', token);
    } else {
      // we have to add the token to the url object
      url.headers.set('Authorization', token);
    }
    return super.request(url, options)
      .map(res => res.json())
      .catch(this.catchAuthError(this));
  }

  private catchAuthError(self: HttpService) {
    // we have to pass HttpService's own instance here as `self`
    return (res: Response) => {
      if (res.status === 401 || res.status === 403) {
        this.authService.logout(true);
      }
      return Observable.throw(res);
    };
  }
}