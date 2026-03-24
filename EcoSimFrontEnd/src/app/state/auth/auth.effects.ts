import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/auth/services/auth-service';
import { AuthActions } from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    tap(({ credentials }) => console.log(' [Auth Effect] Ignition: Login attempt for:', credentials.email)),
    switchMap(({ credentials }) => this.authService.login(credentials).pipe(
      map(response => {
        console.log(' [Auth Effect] Login Success! Token received.');
        return AuthActions.authSuccess({ response });
      }),
      catchError(error => {
        console.error('[Auth Effect] Login Failed:', error);
        return of(AuthActions.authFailure({ error: error.error?.message || 'Login Failed' }));
      })
    ))
  ));

register$ = createEffect(() => this.actions$.pipe(
  ofType(AuthActions.register),
  tap(({ userData }) => console.log(' [Auth Effect] Registering new pilot:', userData.email)),
  switchMap(({ userData }) => this.authService.register(userData).pipe(
    map(() => {
      console.log('[Auth Effect] Registration Success! Redirecting to login...');
      return AuthActions.registerSuccess();
    }),
    catchError(error => {
      console.error(' [Auth Effect] Registration Failed:', error);
      return of(AuthActions.authFailure({ error: error.error?.message || 'Registration Failed' }));
    })
  ))
));

registerSuccess$ = createEffect(() => this.actions$.pipe(
  ofType(AuthActions.registerSuccess),
  tap(() => this.router.navigate(['/login']))
), { dispatch: false });

authSuccess$ = createEffect(() => this.actions$.pipe(
  ofType(AuthActions.authSuccess),
  tap(({ response }) => {

    this.authService.setSession(response);


    if (response.role === 'ADMIN') {
      console.log(' [System] Admin Clearance: Routing to Dashboard');
      this.router.navigate(['/admin/stats']);
    } else {
      console.log(' [System] User Clearance: Routing to Simulation');
      this.router.navigate(['/home']);
    }
  })
), { dispatch: false });



logout$ = createEffect(() => this.actions$.pipe(
  ofType(AuthActions.logout),
  tap(() => {

    localStorage.removeItem('auth_data');



    console.log('[Auth Effect] System Purged. Session Terminated.');
    this.router.navigate(['/login']);
  })
), { dispatch: false });
}
