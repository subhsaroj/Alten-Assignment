import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DiagnosticEvent, EventFilters } from '../../models/diagnostic-event.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getEvents(filters: EventFilters): Observable<DiagnosticEvent[]> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([k, v]) => { if (v) params = params.set(k, v); });

    return this.http.get<DiagnosticEvent[]>(`${this.baseUrl}/events`, { params });
  }

 getErrorsPerVehicle() {
  return this.http.get<Record<string, number>>(`${this.baseUrl}/events/stats/errors-per-vehicle`);
}

getTopErrorCodes() {
  return this.http.get<{ code: string; count: number }[]>(`${this.baseUrl}/events/stats/top-error-codes`);
}

}
