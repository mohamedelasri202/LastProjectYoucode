import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '../../core/profile/services/user-service';
import { UserActions } from './user.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private profileService = inject(ProfileService);

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadProfile),
      mergeMap(() =>
        this.profileService.getCurrentUser().pipe(
          map((user) => UserActions.loadProfileSuccess({ user })),
          catchError((error) => of(UserActions.loadProfileFailure({ error: error.message })))
        )
      )
    )
  );
}