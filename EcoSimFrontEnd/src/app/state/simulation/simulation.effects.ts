import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SimulationService } from '../../core/simulation/services/simulation-service';
import { SimulationActions } from './simulation.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SimulationEffects {
  private actions$ = inject(Actions);
  private simulationService = inject(SimulationService);

  runSimulation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SimulationActions.runSimulation),
      mergeMap(action =>
        this.simulationService.executeSimulation(action).pipe(
          // result here is now automatically inferred as SimulationResponse
          map(result => SimulationActions.runSimulationSuccess({ result })),
          catchError(error => of(SimulationActions.runSimulationFailure({ error: error.message })))
        )
      )
    )
  );
}