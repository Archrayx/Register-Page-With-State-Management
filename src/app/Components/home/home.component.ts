import { TwitterService } from './../../services/twitter.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data$: any;
  data2$: any;

  constructor(private twitterService: TwitterService) {}

  ngOnInit() {
    this.initializeValues();
  }

  initializeValues(): void {
    this.data$ = this.twitterService.getRequest();
  }
}
