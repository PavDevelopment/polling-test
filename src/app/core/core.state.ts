import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { RouterStateUrl } from './router/router.state';

export const reducers: ActionReducerMap<ICoreState> = {
  // polls: pollsReducer,
  router: routerReducer,
};

export const selectRouterState = createFeatureSelector<
  ICoreState,
  RouterReducerState<RouterStateUrl>
>('router');

// export const selectPollsState = createFeatureSelector<
//   ICoreState,
//   RouterReducerState<RouterStateUrl>
// >('polls');

export interface ICoreState {
  // polls: PollsState;
  router: RouterReducerState<RouterStateUrl>;
}
