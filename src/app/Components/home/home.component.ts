import { TwitterService } from './../../services/twitter.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data$: any;

  constructor(private twitterService: TwitterService) {}

  ngOnInit() {
    this.initializeValues();
  }

  initializeValues(): void {
    this.twitterService.getRequest().subscribe((data: any) => {
      console.log('working stuff', typeof data, data);
      this.data$ = data;
    });
  }
}
