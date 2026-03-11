import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Vehicle, VehicleSearchCriteria } from '../../core/vehicle/models/vehicle.model'; 

export const VehicleActions = createActionGroup({
  source: 'Vehicle API',
  events: {
    
    'Load Vehicles': props<{ criteria: VehicleSearchCriteria }>(),
    'Load Vehicles Success': props<{ 
      vehicles: Vehicle[], 
      totalElements: number, 
      totalPages: number 
    }>(),
    'Load Vehicles Failure': props<{ error: string }>(),

 
    'Add Vehicle AI': props<{ 
      vehicle: { brand: string; model: string; year: number } 
    }>(),
    'Add Vehicle AI Success': props<{ vehicle: Vehicle }>(),
    'Add Vehicle AI Failure': props<{ error: string }>(),
    // manual add 
    'Add Vehicle Manual': props<{ vehicle: Partial<Vehicle> }>(),
    'Add Vehicle Manual Success': props<{ vehicle: Vehicle }>(),
    'Add Vehicle Manual Failure': props<{ error: string }>(),

    //  Update
    'Update Vehicle': props<{ id: number; vehicle: Partial<Vehicle> }>(),
    'Update Vehicle Success': props<{ vehicle: Vehicle }>(),
    'Update Vehicle Failure': props<{ error: string }>(),

    // Delete
    'Delete Vehicle': props<{ id: number }>(),
    'Delete Vehicle Success': props<{ id: number }>(),
    'Delete Vehicle Failure': props<{ error: string }>()
  }
});