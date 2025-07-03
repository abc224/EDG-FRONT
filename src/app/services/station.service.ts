import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from '../models/station';
import { environment } from '../environments/environment';
export const apiUrl = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root',
})
export class StationService {
  constructor(private httpClient: HttpClient) {}

  public findAll(): Observable<Station[]> {
    return this.httpClient.get<Station[]>(`${apiUrl}/stations`);
  }

  public new(station: Station | FormData): Observable<Station> {
    return this.httpClient.post<Station>(`${apiUrl}/stations`, station);
  }

  public findById(id: number): Observable<Station> {
    return this.httpClient.get<Station>(`${apiUrl}/stations/` + id);
  }
  public update(id: number, station: Station | FormData): Observable<Station> {
    return this.httpClient.put<Station>(`${apiUrl}/stations/` + id, station);
  }
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<Station>(`${apiUrl}/stations/` + id);
  }
}
