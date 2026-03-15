import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { OperatorAccount } from '../../core/auth/models/OperatorAccount';

export const AdminActions = createActionGroup({
  source: 'Admin Dashboard',
  events: {
  
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: OperatorAccount[] }>(),
    'Load Users Failure': props<{ error: string }>(),

    'Toggle User Block': props<{ userId: number }>(),
    'Toggle User Block Success': props<{ updatedUser: OperatorAccount }>(),
    'Toggle User Block Failure': props<{ error: string }>(),
    'Load Global Stats': emptyProps(),
    'Load Global Stats Success': props<{ stats: Record<string, number> }>(),
    'Load Global Stats Failure': props<{ error: string }>(),
  }
});