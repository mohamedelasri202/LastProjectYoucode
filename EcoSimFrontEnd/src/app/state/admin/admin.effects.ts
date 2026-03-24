import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AdminService } from '../../core/auth/services/admin-service';
import { AdminActions } from './admin.actions';
import { catchError, map, switchMap, of } from 'rxjs';

@Injectable()
export class AdminEffects {
  private actions$ = inject(Actions);
  private adminService = inject(AdminService);

  loadOperators$ = createEffect(() => this.actions$.pipe(
    ofType(AdminActions.loadUsers),
    switchMap(() => this.adminService.fetchAllOperators().pipe(
      map(operators => AdminActions.loadUsersSuccess({ users: operators })),
      catchError(error => of(AdminActions.loadUsersFailure({ error: error.message })))
    ))
  ));


// admin.effects.ts
toggleUserBlock$ = createEffect(() => this.actions$.pipe(
  ofType(AdminActions.toggleUserBlock), // 1. Listen for the Action from the Component
  switchMap(({ userId }) => this.adminService.toggleOperatorStatus(userId).pipe( // 2. Call the Service
    map(updatedUser => {
      console.log('✅ [Effect] Spring Boot Update Success:', updatedUser);
      return AdminActions.toggleUserBlockSuccess({ updatedUser }); // 3. Update the Store
    }),
    catchError(error => {
      console.error('❌ [Effect] API Error:', error);
      return of(AdminActions.toggleUserBlockFailure({ error: error.message }));
    })
  ))
));

loadStats$ = createEffect(() => this.actions$.pipe(
    ofType(AdminActions.loadGlobalStats),
    switchMap(() => this.adminService.fetchGlobalStats().pipe(
      map(stats => AdminActions.loadGlobalStatsSuccess({ stats })),
      catchError(error => of(AdminActions.loadGlobalStatsFailure({ error: error.message })))
    ))
  ));
}