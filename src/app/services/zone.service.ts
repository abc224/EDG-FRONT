import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zone } from '../models/zone';
export const apiUrl = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  constructor(private httpClient: HttpClient) {}

  public findAll(): Observable<Zone[]> {
    return this.httpClient.get<Zone[]>(`${apiUrl}/zone_couverture`);
  }

  public new(Zone: Zone | FormData): Observable<Zone> {
    return this.httpClient.post<Zone>(`${apiUrl}/zone_couverture`, Zone);
  }

  public findById(id: number): Observable<Zone> {
    return this.httpClient.get<Zone>(`${apiUrl}/quartiers/` + id);
  }
  public update(id: number, Zone: Zone): Observable<Zone> {
    return this.httpClient.put<Zone>(`${apiUrl}/edit-Zone/` + id, Zone);
  }
  public delete(id: number): Observable<Zone> {
    return this.httpClient.post<Zone>(`${apiUrl}/delete-Zone/` + id, null);
  }
}
