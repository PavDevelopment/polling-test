import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import {
  ICoreState,
  reducers,
  selectRouterState,
} from './core.state';
import { CustomSerializer } from './router/custom-serializer';

export {
  ICoreState,
  selectRouterState,
};

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,
    FormsModule,

    // ngrx
    // StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([
      // here register polling effects
    ]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: 'Angular NgRx Material Starter',
        }),
  ],
  declarations: [],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    // { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: RouterStateSerializer, useClass: CustomSerializer },
  ],
  exports: [],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
