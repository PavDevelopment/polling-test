import { Component, OnInit } from '@angular/core';
import { mockRandomJokeApiPollConfig, mockRandomJokeApiPollConfig2 } from './polling/poll.mocks';
import { PollingService } from './polling/polling.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'polling-app-demo';
  notifications: string[] = this.pollingService.notifications;

  constructor(private pollingService: PollingService) {}

  ngOnInit(): void {
    this.pollingService.startPolling(mockRandomJokeApiPollConfig);
    this.pollingService.startPolling(mockRandomJokeApiPollConfig2);
  }

  stopPolling(): void {
    this.pollingService.stopPolling(mockRandomJokeApiPollConfig);
    this.pollingService.stopPolling(mockRandomJokeApiPollConfig2);
  }

  handleNotificationClick($event: string): void {
    console.log('notification clicked', $event);
    this.notifications = this.notifications.filter((n) => n !== $event);
  }
}
