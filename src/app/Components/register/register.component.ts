import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { registerAction } from 'src/app/store/actions/register.action';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from 'src/app/store/selectors';
import { RegisterRequestInterface } from 'src/app/shared/types/registerRequest.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  backendErrors$: Observable<BackendErrorsInterface | null>;
  isSubmitting$: Observable<boolean>; //<-- dollar sign is used for streaming variables. or vars that are for http protocol and rxjs. also denotes as an observable
  //<-- dollar sign is used for streaming variables. or vars that are for http protocol and rxjs. also denotes as an observable

  constructor(
    private fb: FormBuilder,
    private store: Store // private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeValues(): void {
    //use .pipe. new version of rxjs makes using alt functions easier for chaining with 'pipe operators'
    //for example before it would be ==> this.store.select(stuff).filter.map.etc..
    //new version allows for in-pipe chaining ==>
    //.pipe(select(stuff),
    //       map((stuff:type)=> "do something")),
    //        etc...())
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    console.log('isSubmitting$', this.isSubmitting$);
  }

  initializeForm(): void {
    console.log('Initialize Form');
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log('Submit', this.form.value, this.form.valid);
    const request: RegisterRequestInterface = {
      user: this.form.value,
    };
    this.store.dispatch(registerAction({ request }));

    //NOT GOOD PRACTICE TO CALL HTTP REQUEST IN COMPONENT
    // this.authService
    //   .register(this.form.value)
    //   .subscribe((currentUser: CurrentUserInterface) => {
    //     console.log('current user: ', currentUser);
    //   });
  }
}
