import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DiagnosticEvent, EventFilters } from '../../models/diagnostic-event.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3000';
  criticalDays = 180;
  constructor(private http: HttpClient) { }

  getEvents(filters: any) {
    return this.http.get<{
      data: DiagnosticEvent[];
      total: number;
      page: number;
      limit: number;
    }>(`${this.baseUrl}/events`, { params: filters });
  }


  getErrorsPerVehicle() {
    return this.http.get<Record<string, number>>(`${this.baseUrl}/events/stats/errors-per-vehicle`);
  }

  getTopErrorCodes() {
    return this.http.get<{ code: string; count: number }[]>(`${this.baseUrl}/events/stats/top-error-codes`);
  }

 


 getCriticalVehicles(days: number) {
  return this.http.get<{ 
    criticalVehicles: string[], 
    windowDays: number 
  }>(`${this.baseUrl}/events/stats/critical-vehicles`, {
    params: { days }
  });
}

}
