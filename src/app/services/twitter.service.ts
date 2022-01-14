import { TwitterRequestInterface } from './../shared/types/twitterRequest.interface';
import { TwitterResponseInterface } from './../shared/types/twitterResponse.interface';

import { AuthResponseInterface } from './../shared/types/authResponse.interface';
import { environment } from 'src/environments/environment';
import { RegisterRequestInterface } from './../shared/types/registerRequest.interface';
import { Injectable, OnInit } from '@angular/core';
import { CurrentUserInterface } from '../shared/types/currentUser.interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TwitterService implements OnInit {
  constructor(private http: HttpClient, private headers: HttpHeaders) {}

  ngOnInit(): void {
    this.initializeHeader();
  }

  getRequest(data?: TwitterRequestInterface): Observable<any> {
    // const reqHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${environment.TWITTER_BEARER_TOKEN}`,
    //   'Access-Control-Allow-Origin': '*',
    // });

    return this.http
      .get(environment.TWITTER_API_URL, { headers: this.headers })
      .pipe(map((data) => data));
  }

  initializeHeader(): void {
    this.headers
      .set('Accept', '*/*')
      .set('content-type', 'application/json')
      .set(
        'Authorization',
        `OAuth oauth_consumer_key=${environment.TWITTER_API_KEY},oath_token=${environment.ACCESS_TOKEN}`
      )
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
      .set('User-Agent', 'twit-client')
      .set('accept-encoding', 'gzip, deflate');
    console.log(this.headers);
  }
}
