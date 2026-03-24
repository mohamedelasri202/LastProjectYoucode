import { createFeature, createReducer, on, createSelector } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from '../../core/auth/models/auth.model'; 


export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const savedToken = localStorage.getItem('token');
const initialState: AuthState = {
  user: null,
  token: savedToken ?? null, 
  isLoading: false,
  error: null,
};


export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,

 
    on(AuthActions.login, AuthActions.register, (state) => ({ 
      ...state, 
      isLoading: true, 
      error: null 
    })),

      on(AuthActions.registerSuccess, (state) => ({
        ...state,
        isLoading: false,
        error: null
      })),
    
      on(AuthActions.authSuccess, (state, { response }) => ({
  ...state,
  user: {
    username: response.username,
    email: response.email,
    role: response.role
  },
  token: response.token,
  isLoading: false,
  error: null
})),

   
    on(AuthActions.authFailure, (state, { error }) => ({ 
      ...state, 
      error, 
      isLoading: false 
    })),

    
    on(AuthActions.logout, () => initialState)
  ),


extraSelectors: ({ selectToken, selectUser }) => ({
    
    selectIsAuthenticated: createSelector(
      selectToken,
      (token) => !!token
    ),

 
    selectUserRole: createSelector(
      selectUser,
      (user) => user?.role ?? null
    ),
  }),
});