import { createFeature, createReducer, on } from '@ngrx/store';
import { VehicleActions } from './vehicle.actions';
import { Vehicle, VehicleSearchCriteria } from '../../core/vehicle/models/vehicle.model';

export interface VehicleState {
  vehicles: Vehicle[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  criteria: VehicleSearchCriteria;
  isLoading: boolean;
  error: string | null;
}

const initialState: VehicleState = {
  vehicles: [],
  totalElements: 0,
  totalPages: 0,
  currentPage: 0,
  criteria: { page: 0, size: 6, engineType: null },
  isLoading: false,
  error: null
};

export const vehicleFeature = createFeature({
  name: 'vehicle',
  reducer: createReducer(
    initialState,

    // --- LOADING HANDLERS ---
    on(VehicleActions.loadVehicles, (state, { criteria }) => ({ 
      ...state, criteria, isLoading: true, error: null 
    })),
    on(VehicleActions.loadVehiclesSuccess, (state, { vehicles, totalElements, totalPages }) => ({
      ...state, vehicles, totalElements, totalPages, isLoading: false
    })),
    on(VehicleActions.loadVehiclesFailure, (state, { error }) => ({
      ...state, error, isLoading: false
    })),

    // --- ADD HANDLERS (AI & MANUAL) ---
    on(VehicleActions.addVehicleAI, VehicleActions.addVehicleManual, (state) => ({
      ...state, isLoading: true, error: null
    })),
    on(VehicleActions.addVehicleAISuccess, VehicleActions.addVehicleManualSuccess, (state, { vehicle }) => ({
      ...state,
      vehicles: [vehicle, ...state.vehicles], // Add to the top of the list
      totalElements: state.totalElements + 1,
      isLoading: false
    })),
    on(VehicleActions.addVehicleAIFailure, VehicleActions.addVehicleManualFailure, (state, { error }) => ({
      ...state, error, isLoading: false
    })),

    // --- UPDATE HANDLER ---
    on(VehicleActions.updateVehicleSuccess, (state, { vehicle }) => ({
      ...state,
      vehicles: state.vehicles.map(v => v.id === vehicle.id ? vehicle : v),
      isLoading: false
    })),

    // --- DELETE HANDLER ---
    on(VehicleActions.deleteVehicleSuccess, (state, { id }) => ({
      ...state,
      vehicles: state.vehicles.filter(v => v.id !== id), // Remove from local state
      totalElements: state.totalElements - 1,
      isLoading: false
    }))
  )
});