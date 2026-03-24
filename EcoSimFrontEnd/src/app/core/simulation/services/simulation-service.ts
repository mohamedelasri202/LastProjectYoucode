import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SimulationRequest, SimulationResponse } from '../models/simulation-request.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/simulations/run`;

  executeSimulation(request: SimulationRequest): Observable<SimulationResponse> {
    // This now returns the object containing { simulationDetails, aiRecommendation }
    return this.http.post<SimulationResponse>(this.apiUrl, request);
  }
}