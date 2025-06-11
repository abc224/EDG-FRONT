import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SousPrefecture } from '../models/sousPrefecture';
import { Observable } from 'rxjs';
import { Quartier } from '../models/quartier';
export const apiUrl = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root',
})
export class SousPrefectureService {
  constructor(private httpClient: HttpClient) {}

  public findAll(): Observable<SousPrefecture[]> {
    return this.httpClient.get<SousPrefecture[]>(`${apiUrl}/sousprefectures`);
  }

  public new(
    sousPrefecture: SousPrefecture | FormData
  ): Observable<SousPrefecture> {
    return this.httpClient.post<SousPrefecture>(
      `${apiUrl}/sousprefectures`,
      sousPrefecture
    );
  }

  public findById(id: number): Observable<SousPrefecture> {
    return this.httpClient.get<SousPrefecture>(`${apiUrl}/prefectures/` + id);
  }
  public update(
    id: number,
    sousPrefecture: SousPrefecture
  ): Observable<SousPrefecture> {
    return this.httpClient.put<SousPrefecture>(
      `${apiUrl}/edit-prefecture/` + id,
      sousPrefecture
    );
  }
  public delete(id: number): Observable<SousPrefecture> {
    return this.httpClient.post<SousPrefecture>(
      `${apiUrl}/delete-prefecture/` + id,
      null
    );
  }

  getQuartiersBySousPrefecture(sousPrefectureID: number): Observable<any[]> {
    return this.httpClient.get<Quartier[]>(
      `${apiUrl}/sousprefectures/${sousPrefectureID}/quartiers`
    );
  }
}
