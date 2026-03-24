import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { OperatorAccount } from '../models/OperatorAccount';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/admin/users`;

 
  fetchAllOperators(): Observable<OperatorAccount[]> {
    return this.http.get<OperatorAccount[]>(this.API_URL);
  }

  
  toggleOperatorStatus(id: number): Observable<OperatorAccount> {
    console.log('📡 [UI] Dispatching Toggle for User ');
    return this.http.patch<OperatorAccount>(`${this.API_URL}/${id}/block`, {});
  }
  fetchGlobalStats(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.API_URL}/stats/summary`);
  }
}