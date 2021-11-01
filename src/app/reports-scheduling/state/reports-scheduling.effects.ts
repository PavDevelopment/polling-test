import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import { GalleryApiService } from '../api/gallery-api.service';

import * as GalleryActions from './reports-scheduling.actions';
import * as GalleryFeature from './reports-scheduling.reducer';

@Injectable()
export class GalleryEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GalleryActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return this.galleryApiService.getCatsList().pipe(
            map((res) =>
              GalleryActions.loadGallerySuccess({
                gallery: res,
              })
            )
          );
        },
        onError: (action, error) => {
          return GalleryActions.loadGalleryFailure({ error });
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private galleryApiService: GalleryApiService
  ) {}
}
