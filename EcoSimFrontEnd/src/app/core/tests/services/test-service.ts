import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { from } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { RouteRequest } from '../models/RouteRequest';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/trips/calculate`;

  calculateDistance(request: RouteRequest): Observable<number[]> {
    return this.http.post<number[]>(this.apiUrl, request);
  }
}