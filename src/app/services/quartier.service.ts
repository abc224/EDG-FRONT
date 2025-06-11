import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quartier } from '../models/quartier';
export const apiUrl = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root',
})
export class QuartierService {
  constructor(private httpClient: HttpClient) {}

  public findAll(): Observable<Quartier[]> {
    return this.httpClient.get<Quartier[]>(`${apiUrl}/quartiers`);
  }

  public new(Quartier: Quartier | FormData): Observable<Quartier> {
    return this.httpClient.post<Quartier>(`${apiUrl}/quartiers`, Quartier);
  }

  public findById(id: number): Observable<Quartier> {
    return this.httpClient.get<Quartier>(`${apiUrl}/quartiers/` + id);
  }
  public update(id: number, Quartier: Quartier): Observable<Quartier> {
    return this.httpClient.put<Quartier>(
      `${apiUrl}/edit-quartier/` + id,
      Quartier
    );
  }
  public delete(id: number): Observable<Quartier> {
    return this.httpClient.post<Quartier>(
      `${apiUrl}/delete-quartier/` + id,
      null
    );
  }
}
