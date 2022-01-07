import { HomeComponent } from './../../Components/home/home.component';
import { BackendErrorMessagesModule } from './../../Components/backend-error-messages/backend-error-messages/backend-error-messages.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from 'src/app/Components/register/register.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/store/reducer';
import { AuthService } from 'src/app/services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { RegisterEffect } from 'src/app/store/effects/register.effects';
import { PersistanceService } from 'src/app/services/persistance.service';

const routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];
@NgModule({
  declarations: [RegisterComponent, HomeComponent],
  imports: [
    CommonModule,
    BackendErrorMessagesModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegisterEffect]),
  ],
  providers: [AuthService, PersistanceService],
})
export class AuthModule {}
