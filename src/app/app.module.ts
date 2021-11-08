import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NotificationPopoverComponent } from './notification-popover/notification-popover.component';
import { PollingService } from './polling/polling.service';

@NgModule({
  declarations: [AppComponent, NotificationPopoverComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    CoreModule,
    NgbModule,
    NgbDropdownModule,
  ],
  providers: [PollingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
