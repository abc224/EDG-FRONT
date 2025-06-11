import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Village } from '../models/village';
export const apiUrl = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root',
})
export class VillageService {
  constructor(private httpClient: HttpClient) {}

  public findAll(): Observable<Village[]> {
    return this.httpClient.get<Village[]>(`${apiUrl}/quartiers`);
  }

  public new(village: Village | FormData): Observable<Village> {
    return this.httpClient.post<Village>(`${apiUrl}/quartiers`, village);
  }

  public findById(id: number): Observable<Village> {
    return this.httpClient.get<Village>(`${apiUrl}/quartiers/` + id);
  }
  public update(id: number, village: Village): Observable<Village> {
    return this.httpClient.put<Village>(
      `${apiUrl}/edit-village/` + id,
      village
    );
  }
  public delete(id: number): Observable<Village> {
    return this.httpClient.post<Village>(
      `${apiUrl}/delete-village/` + id,
      null
    );
  }
}
