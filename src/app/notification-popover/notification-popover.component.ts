import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';

@Component({
  selector: 'app-notification-popover',
  templateUrl: './notification-popover.component.html',
  styleUrls: ['./notification-popover.component.scss'],
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class NotificationPopoverComponent {
  @Input() notifications: string[] = [];
  @Input() notificationIconUrl: string = 'https://i.imgur.com/AC7dgLA.png';
  @Input() notificationPopupIconUrl: string =
    'https://image.shutterstock.com/image-vector/green-check-mark-icon-tick-600w-522874111.jpg';

  @Output() notificationClicked: EventEmitter<string> =
    new EventEmitter<string>();

  isOpen = false;

  onNotificationClick(notification: string): void {
    this.notificationClicked.emit(notification);
  }
}
