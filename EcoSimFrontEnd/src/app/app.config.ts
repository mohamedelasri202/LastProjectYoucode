import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router'; 
import { routes } from './app.routes';           
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// Auth & Vehicles
import { authFeature } from './state/auth/auth.reducer';
import { AuthEffects } from './state/auth/auth.effects';
import { authInterceptor } from './core/auth/interceptors/auth-interceptor';
import { vehicleFeature } from './state/vehicle/vehicle.reducer'; 
import { VehicleEffects } from './state/vehicle/vehicle.effects';


import { simulationFeature } from './state/simulation/simulation.reducer';
import { SimulationEffects } from './state/simulation/simulation.effects';
import { adminFeature } from './state/admin/admin.reducer';
import { AdminEffects } from './state/admin/admin.effects';
import { UserEffects } from './state/profile/profile.effects';
import { userReducer } from './state/profile/user.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideStore({ 
      [authFeature.name]: authFeature.reducer,
      [vehicleFeature.name]: vehicleFeature.reducer,
      [simulationFeature.name]: simulationFeature.reducer,
      
      [adminFeature.name]: adminFeature.reducer ,
      user: userReducer
    }),
    provideEffects([
      AuthEffects, 
      VehicleEffects,
      SimulationEffects,
     UserEffects,
     AdminEffects 
    ]),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};