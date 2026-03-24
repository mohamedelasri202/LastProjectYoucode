import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { VehicleSearchCriteria, Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/vehicles`;

  getVehicles(criteria: VehicleSearchCriteria): Observable<any> {
    const searchUrl = `${this.baseUrl}/search`;
    let params = new HttpParams()
      .set('page', criteria.page.toString())
      .set('size', criteria.size.toString());

    if (criteria.brand?.trim()) params = params.set('brand', criteria.brand.trim());
    if (criteria.model?.trim()) params = params.set('model', criteria.model.trim());
    if (criteria.engineType) params = params.set('engineType', criteria.engineType);

    return this.http.get<any>(searchUrl, { params });
  }


  createAiVehicle(vehicleData: { brand: string, model: string, year: number }): Observable<Vehicle> {
    const aiUrl = `${this.baseUrl}/ai`;
    console.log(` [AI Commissioning] Sending data to: ${aiUrl}`, vehicleData);
    return this.http.post<Vehicle>(aiUrl, vehicleData);
  }


  createManualVehicle(vehicle: Partial<Vehicle>): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.baseUrl}/manual`, vehicle);
  }

  updateVehicle(id: number, vehicle: Partial<Vehicle>): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.baseUrl}/update/${id}`, vehicle);
  }

  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
