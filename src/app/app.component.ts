import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import polling from 'rx-polling';
import { take, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'polling-app-demo';
  notifications: string[] = [];
  pollConfig = {
    maxPollAttempts: 10,
    attemptsMade: 0,
    pollDelay: 1000,
    isPollRunning: true,
    pollStartDate: Date.now(),
    pollOptions: {
      interval: 0,
      attempts: 3,
      backoffStrategy: 'exponential',
      exponentialUnit: 3000, // 3 seconds
      backgroundPolling: true,
    },
    pollRequest$: null,
    pollUrl: 'https://icanhazdadjoke.com',
    pollHeaders: {
      accept: 'application/json',
    } as any,
  };

  constructor(private http: HttpClient) {
    this.pollConfig.pollRequest$ = this.http.get(this.pollConfig.pollUrl, {
      headers: this.pollConfig.pollHeaders,
    }) as any;
  }

  ngOnInit(): void {
    this.startPolling(
      this.pollConfig.pollRequest$,
      this.pollConfig,
      'test-poll'
    );
  }

  startPolling(urlRequest$: any, pollConfig: any, pollId: string): void {
    polling(pollConfig.pollRequest$, pollConfig.pollOptions)
      .pipe(takeWhile(() => this.pollConfig.isPollRunning))
      .pipe(take(1))
      .subscribe(
        (response) => {
          console.log('joke response', response);
          const {joke}: any = response;
          if (joke) {
            this.notifications.push(joke);
          }
          const today = new Date();
          this.pollConfig.attemptsMade++;
          this.pollConfig.pollDelay = this.pollConfig.pollDelay * 2;
          console.log(
            'made poll @',
            today.getHours() +
              ':' +
              today.getMinutes() +
              ':' +
              today.getSeconds()
          );
          console.log(
            'next poll delay in milliseconds',
            this.pollConfig.pollDelay
          );

          if (this.pollConfig.attemptsMade < this.pollConfig.maxPollAttempts) {
            this.continuePolling();
          } else {
            this.stopPolling();
          }
        },
        (error) => {
          console.error('entered error', error);
          // mark poll as failed
          this.stopPolling();
        }
      );
  }

  stopPolling(): void {
    this.pollConfig.isPollRunning = false;
  }

  continuePolling(): void {
    setTimeout(() => {
      this.startPolling(
        this.pollConfig.pollRequest$,
        this.pollConfig,
        'test-poll'
      );
    }, this.pollConfig.pollDelay);
  }
}
