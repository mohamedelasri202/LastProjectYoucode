import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { LoginReq, AuthResponse, RegisterReq } from '../../core/auth/models/auth.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ credentials: LoginReq }>(),
    'Register': props<{ userData: RegisterReq }>(),
    'Register Success': emptyProps(),
    'Auth Success': props<{ response: AuthResponse }>(),
    'Auth Failure': props<{ error: string }>(),
    'Logout': emptyProps(),
  }
});