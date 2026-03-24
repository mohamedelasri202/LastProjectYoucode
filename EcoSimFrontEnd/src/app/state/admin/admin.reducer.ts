import { createFeature, createReducer, on } from '@ngrx/store';
import { AdminActions } from './admin.actions';
import { OperatorAccount } from '../../core/auth/models/OperatorAccount';

export interface AdminState {
  users: OperatorAccount[];
 
  stats: Record<string, number> | null; 
  isLoading: boolean;
  error: string | null;
}

export const initialState: AdminState = {
  users: [],

  stats: null, 
  isLoading: false,
  error: null
};

export const adminFeature = createFeature({
  name: 'admin',
  reducer: createReducer(
    initialState,

  
    on(AdminActions.loadUsers, (state) => ({ 
      ...state, 
      isLoading: true 
    })),
    on(AdminActions.loadUsersSuccess, (state, { users }) => ({ 
      ...state, 
      users, 
      isLoading: false 
    })),
    on(AdminActions.toggleUserBlockSuccess, (state, { updatedUser }) => ({
      ...state,
      users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
    })),

   
    on(AdminActions.loadGlobalStats, (state) => ({ 
      ...state, 
      isLoading: true 
    })),
    on(AdminActions.loadGlobalStatsSuccess, (state, { stats }) => ({ 
      ...state, 
      stats, 
      isLoading: false 
    })),
    on(AdminActions.loadGlobalStatsFailure, (state, { error }) => ({ 
      ...state, 
      error, 
      isLoading: false 
    }))
  )
});