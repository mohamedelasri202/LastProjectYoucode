import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VehicleService } from '../../core/vehicle/services/vehicle-service';
import { VehicleActions } from './vehicle.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class VehicleEffects {
  private actions$ = inject(Actions);
  private vehicleService = inject(VehicleService);


  loadVehicles$ = createEffect(() => this.actions$.pipe(
    ofType(VehicleActions.loadVehicles),
    switchMap(({ criteria }) =>
      this.vehicleService.getVehicles(criteria).pipe(
        map((pageResponse: any) => VehicleActions.loadVehiclesSuccess({
          vehicles: pageResponse.content || [],
          totalElements: pageResponse.totalElements || 0,
          totalPages: pageResponse.totalPages || 0
        })),
        catchError(error => of(VehicleActions.loadVehiclesFailure({ error: error.message })))
      )
    )
  ));


  addVehicleAI$ = createEffect(() => this.actions$.pipe(
    ofType(VehicleActions.addVehicleAI),
    tap(() => console.log('📡 [System] Dispatching Identity to AI Engine...')),
    switchMap(({ vehicle }) =>
      this.vehicleService.createAiVehicle(vehicle).pipe(
        map(newVehicle => VehicleActions.addVehicleAISuccess({ vehicle: newVehicle })),
        catchError(error => {
          console.error(' [AI Error]:', error);
          return of(VehicleActions.addVehicleAIFailure({ error: error.message }));
        })
      )
    )
  ));


  addVehicleManual$ = createEffect(() => this.actions$.pipe(
    ofType(VehicleActions.addVehicleManual),
    tap(() => console.log(' [Admin] Initializing Manual Vehicle Registration...')),
    switchMap(({ vehicle }) =>
      this.vehicleService.createManualVehicle(vehicle).pipe(
        map(newVehicle => VehicleActions.addVehicleManualSuccess({ vehicle: newVehicle })),
        catchError(error => of(VehicleActions.addVehicleManualFailure({ error: error.message })))
      )
    )
  ));


  updateVehicle$ = createEffect(() => this.actions$.pipe(
    ofType(VehicleActions.updateVehicle),
    tap(({ id }) => console.log('️ [Admin] Reconfiguring Vehicle ID:', id)),
    switchMap(({ id, vehicle }) =>
      this.vehicleService.updateVehicle(id, vehicle).pipe(
        map(updatedVehicle => VehicleActions.updateVehicleSuccess({ vehicle: updatedVehicle })),
        catchError(error => of(VehicleActions.updateVehicleFailure({ error: error.message })))
      )
    )
  ));


  deleteVehicle$ = createEffect(() => this.actions$.pipe(
    ofType(VehicleActions.deleteVehicle),
    tap(({ id }) => console.log('🗑 [Admin] Purging Vehicle VIN:', id)),
    switchMap(({ id }) =>
      this.vehicleService.deleteVehicle(id).pipe(
        map(() => VehicleActions.deleteVehicleSuccess({ id })),
        catchError(error => of(VehicleActions.deleteVehicleFailure({ error: error.message })))
      )
    )
  ));
}
