import { isLoggedInSelector } from './auth/store/actions/selectors';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'buy-sell-bot';
  isLoggedIn$: Observable<boolean> | null;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.initializeValues();
  }
  initializeValues(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }
}
