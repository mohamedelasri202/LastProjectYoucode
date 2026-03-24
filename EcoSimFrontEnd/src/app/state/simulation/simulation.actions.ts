import { createActionGroup, props } from '@ngrx/store';
import { SimulationRequest, SimulationResponse } from '../../core/simulation/models/simulation-request.model';

export const SimulationActions = createActionGroup({
  source: 'Simulation',
  events: {
    'Run Simulation': props<SimulationRequest>(),
    // Ensure this uses SimulationResponse
    'Run Simulation Success': props<{ result: SimulationResponse }>(), 
    'Run Simulation Failure': props<{ error: string }>(),
  }
});