import { TwitterRequestInterface } from './../shared/types/twitterRequest.interface';
import { TwitterResponseInterface } from './../shared/types/twitterResponse.interface';

import { AuthResponseInterface } from './../shared/types/authResponse.interface';
import { environment } from 'src/environments/environment';
import { RegisterRequestInterface } from './../shared/types/registerRequest.interface';
import { Injectable, OnInit } from '@angular/core';
import { CurrentUserInterface } from '../shared/types/currentUser.interface';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TwitterService implements OnInit {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}
  // intercept(req: HttpRequest<any>, next: HttpHandler) {
  //   return;
  // }
  getRequest(_data?: TwitterRequestInterface): Observable<any> {
    //   .set('Authorization', `Bearer ${environment.TWITTER_BEARER_TOKEN}`)
    //   .set(
    //     'Access-Control-Allow-Methods',
    //     'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    //   )
    //   .set(
    //     'Access-Control-Allow-Headers',
    //     'Origin, Content-Type, X-Auth-Token'
    //   );
    return this.http.get('http://localhost:3000/home_timeline').pipe(
      map((res: any): any => {
        console.log('initial type', typeof res.data.data, res.data.data);
        return res.data.data;
      })
    );
  }
}
