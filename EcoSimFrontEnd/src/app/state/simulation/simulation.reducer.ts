import { createFeature, createReducer, on } from '@ngrx/store';
import { SimulationActions } from './simulation.actions';
import { SimulationResponse } from '../../core/simulation/models/simulation-request.model';

interface SimulationState {
  result: SimulationResponse | null; // This now holds { simulationDetails, aiRecommendation }
  isLoading: boolean;
  error: string | null;
}

const initialState: SimulationState = {
  result: null,
  isLoading: false,
  error: null,
};

export const simulationFeature = createFeature({
  name: 'simulation',
  reducer: createReducer(
    initialState,
    on(SimulationActions.runSimulation, (state) => ({ ...state, isLoading: true, error: null })),
    on(SimulationActions.runSimulationSuccess, (state, { result }) => ({
      ...state,
      result: result, // result contains simulationDetails and aiRecommendation
      isLoading: false
    })),
    on(SimulationActions.runSimulationFailure, (state, { error }) => ({ ...state, isLoading: false, error }))
  ),
});