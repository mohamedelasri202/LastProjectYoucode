import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {User} from '../../core/profile/models/user'

export const UserActions = createActionGroup({
  source: 'User Profile',
  events: {
    'Load Profile': emptyProps(),
    'Load Profile Success': props<{ user: User }>(),
    'Load Profile Failure': props<{ error: string }>(),
    'Clear Profile': emptyProps(),
  }
});