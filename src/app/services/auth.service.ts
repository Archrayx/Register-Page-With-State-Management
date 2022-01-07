import { AuthResponseInterface } from './../shared/types/authResponse.interface';
import { environment } from 'src/environments/environment';
import { RegisterRequestInterface } from './../shared/types/registerRequest.interface';
import { Injectable } from '@angular/core';
import { CurrentUserInterface } from '../shared/types/currentUser.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  //submits a register post to an api from conduity that acts as a temp place to submit
  // idk if cors is enable on that site. the return of post should be a currentUserInterface type model
  //packed in a json object called user. this matches with model of AuthResponseInterface -- check doc for model
  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map((response: AuthResponseInterface) => response.user));
  }
}
