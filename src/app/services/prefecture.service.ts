import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Prefecture } from '../models/prefecture';
import { Observable } from 'rxjs';
import { SousPrefecture } from '../models/sousPrefecture';
export const apiUrl = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root',
})
export class PrefectureService {
  constructor(private httpClient: HttpClient) {}

  public findAll(): Observable<Prefecture[]> {
    return this.httpClient.get<Prefecture[]>(`${apiUrl}/allprefectures`);
  }

  public new(prefecture: Prefecture | FormData): Observable<Prefecture> {
    return this.httpClient.post<Prefecture>(
      `${apiUrl}/add_prefecture`,
      prefecture
    );
  }

  public findById(id: number): Observable<Prefecture> {
    return this.httpClient.get<Prefecture>(`${apiUrl}/prefectures/` + id);
  }
  public update(id: number, prefecture: Prefecture): Observable<Prefecture> {
    return this.httpClient.put<Prefecture>(
      `${apiUrl}/edit-prefecture/` + id,
      prefecture
    );
  }
  public delete(id: number): Observable<Prefecture> {
    return this.httpClient.post<Prefecture>(
      `${apiUrl}/delete-prefecture/` + id,
      null
    );
  }

  getSousPrefecturesByPrefecture(prefectureId: number): Observable<any[]> {
    return this.httpClient.get<SousPrefecture[]>(
      `${apiUrl}/prefectures/${prefectureId}/sousprefectures`
    );
  }
}
