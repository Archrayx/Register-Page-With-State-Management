import { createAction, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../shared/types/registerRequest.interface';
import { ActionTypes } from './actionTypes';

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{ request: RegisterRequestInterface }>()
);
