import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import polling from 'rx-polling';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, takeWhile } from 'rxjs/operators';
import { IPollConfig } from './poll.models';

@Injectable({
  providedIn: 'root',
})
export class PollingService {
  notificationsViewModelSubject = new BehaviorSubject<string[]>([]);
  notificationsViewModel$: Observable<string[]> =
    this.notificationsViewModelSubject.asObservable();

  polls: IPollConfig[] = [];
  notifications: string[] = [];

  constructor(private http: HttpClient) {}

  public startPolling(pollConfig: IPollConfig): void {
    if (!this.polls.includes(pollConfig)) {
      this.createPollHttpRequest(pollConfig);
      this.polls.push(pollConfig);
      this.makePoll(pollConfig);
    }
  }

  public stopPolling(pollConfig: IPollConfig): void {
    this.polls.filter((p) => p.id === pollConfig.id)[0].isPollRunning = false;
  }

  private makePoll(pollConfig: IPollConfig): void {
    polling(pollConfig.pollRequest$, pollConfig.pollOptions)
      .pipe(takeWhile(() => pollConfig.isPollRunning))
      .pipe(take(1))
      .subscribe(
        (response: any) => {
          this.handlePollSuccessResponse(pollConfig, response);
        },
        (error: Error) => {
          this.handlePollFailureResponse(pollConfig, error);
        }
      );
  }

  private handlePollSuccessResponse(
    pollConfig: IPollConfig,
    response: any
  ): void {
    const result = pollConfig.pollSuccessCondition.processPollRequest(response);
    if (result.isSuccess && result.notification) {
      this.stopPolling(pollConfig);
      this.notifications.push(result.notification);
      this.notificationsViewModelSubject.next(this.notifications);
    }

    if (
      pollConfig.isPollRunning &&
      pollConfig.attemptsMade < pollConfig.maxPollAttempts
    ) {
      this.continuePolling(pollConfig);
    }

    if (
      pollConfig.isPollRunning &&
      pollConfig.attemptsMade >= pollConfig.maxPollAttempts
    ) {
      this.stopPolling(pollConfig);
    }

    if (pollConfig.logPoll) {
      this.logPolling(pollConfig);
    }
  }

  private handlePollFailureResponse(
    pollConfig: IPollConfig,
    error: Error
  ): void {
    console.error('entered error', error);
    this.stopPolling(pollConfig);
  }

  private continuePolling(pollConfig: IPollConfig): void {
    pollConfig.attemptsMade++;
    pollConfig.pollDelay = pollConfig.pollDelay * 2;
    setTimeout(() => {
      this.makePoll(pollConfig);
    }, pollConfig.pollDelay);
  }

  private logPolling(pollConfig: IPollConfig): void {
    const today = new Date();
    console.log(
      'made poll @',
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    );
    console.log('next poll delay in milliseconds', pollConfig.pollDelay);
  }

  private createPollHttpRequest(pollConfig: IPollConfig): void {
    pollConfig.pollRequest$ = this.http.get(pollConfig.pollUrl, {
      headers: pollConfig.pollHeaders,
    }) as any;
  }
}
