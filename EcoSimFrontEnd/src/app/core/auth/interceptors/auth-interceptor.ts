import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { authFeature } from '../../../state/auth/auth.reducer';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  
  
  const token = store.selectSignal(authFeature.selectToken)();
console.log('🔑 Token on request:', token ? 'EXISTS' : 'NULL', req.url);
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};