import { PersistanceService } from './../../services/persistance.service';
import {
  registerFailureAction,
  registerSuccessAction,
} from './../actions/register.action';
import { CurrentUserInterface } from './../../shared/types/currentUser.interface';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { registerAction } from '../actions/register.action';
import { of } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token);
            return registerSuccessAction({ currentUser });
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              registerFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );
  //will explain what it does. to put it simply its cause a chain of functions that activates
  //when ofType registerAction action occurs. it takes request response values(RgisterActionInterface)
  //and throws it into our auth service to register the account. after which, the returned observable
  //item should be of type currentUser. it then triggers registerSuccessAction.
  //if it fails catchError pipe execute to throw RegisterFailureAction
  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  //map returns something, tap doesnt return something

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}
}
