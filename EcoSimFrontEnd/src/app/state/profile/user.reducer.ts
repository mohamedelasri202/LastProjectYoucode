    import { createReducer, on } from '@ngrx/store';
import {User, UserState} from '../../core/profile/models/user'
import { UserActions } from './user.actions';

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadProfile, (state) => ({ ...state, loading: true })),
  on(UserActions.loadProfileSuccess, (state, { user }) => ({ 
    ...state, 
    user, 
    loading: false, 
    error: null 
  })),
  on(UserActions.loadProfileFailure, (state, { error }) => ({ 
    ...state, 
    loading: false, 
    error 
  }))
);