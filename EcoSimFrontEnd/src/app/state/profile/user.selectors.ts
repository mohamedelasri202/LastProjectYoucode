import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../../core/profile/models/user';


export const selectUserState = createFeatureSelector<UserState>('user');


export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);


export const selectUserLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);


export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);


export const selectPilotFullName = createSelector(
  selectUser,
  (user) => user ? `${user.firstName} ${user.lastName}` : 'Unknown_Pilot'
);