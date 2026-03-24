import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authFeature } from '../../../state/auth/auth.reducer';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  
  const isAuthenticated = store.selectSignal(authFeature.selectIsAuthenticated)();
  const userRole = store.selectSignal(authFeature.selectUserRole)();

  
  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }


  const isPilotRoute = state.url.includes('/home') || state.url.includes('/myGarage');
  
  if (userRole === 'ADMIN' && isPilotRoute) {
    console.warn('RESTRICTED_ACCESS: ADMIN_REDIRECT_TO_DASHBOARD');
    router.navigate(['/admin/stats']);
    return false;
  }

 
  return true;
};