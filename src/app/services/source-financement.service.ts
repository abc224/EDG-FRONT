import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SourceFinancement } from '../models/source-financement';
export const apiUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class SourceFinancementService {
  constructor(private httpClient: HttpClient) {}

  public findAll(): Observable<SourceFinancement[]> {
    return this.httpClient.get<SourceFinancement[]>(`${apiUrl}/sources`);
  }

  public new(
    region: SourceFinancement | FormData
  ): Observable<SourceFinancement> {
    return this.httpClient.post<SourceFinancement>(`${apiUrl}/sources`, region);
  }

  public findById(id: number): Observable<SourceFinancement> {
    return this.httpClient.get<SourceFinancement>(`${apiUrl}/sources/` + id);
  }
  public update(
    id: number,
    region: SourceFinancement | FormData
  ): Observable<SourceFinancement> {
    return this.httpClient.put<SourceFinancement>(
      `${apiUrl}/sources/` + id,
      region
    );
  }
  public delete(id: number): Observable<SourceFinancement> {
    return this.httpClient.post<SourceFinancement>(
      `${apiUrl}/sources/` + id,
      null
    );
  }
}
