import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from '../shared/types/appState.interface';
import { AuthStateInterface } from '../shared/types/authState.interface';

export const authFeatureSelector = createFeatureSelector<
  AppStateInterface,
  AuthStateInterface
>('auth');

//creating a type for create feature selector method. this removes Type T or generic type. in doing so, this
//tells which interface we are using for the global state property and which interface we are using to pass into that global state.
//e.g appstate is gbl state and authstate is the interface within. this creates a memoized selector.

//feature selector allows us to access the state properties in 'auth' --> which we then create a selector for below to return the value
//of property isSubmitting. 'auth' is defined as a property in appStateInterface. but the state is defined intially in auth.module. as 'auth'.
//FLOW ==> AppStateInterface has PROP 'auth' OF TYPE AuthStateInterface ==> createFeatureSelector() takes state 'auth' when passed as a
// parameter from auth.module.ts ==>createSelector() TAKES 2 ARGS -> created_feature_selector_var & LAMBDA FUNC. RETURN PROP IN 'auth'
//e.g isSubmitting is PROP in authStateInterface. we can then use it in component as observable object. don't forget to use async pipe!
export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isSubmitting
);

//the above selector can be seen as a getter, the getter is for a property, isSubmitting. the above code can be reused for other prop getters asd well
//type of authstateinteface is implicitly written for other devs to understand the code space better. also, referencing implicitly can be seen when wanting
//to inspect the areas where that interface is used in other code areas.

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.validationErrors
);
