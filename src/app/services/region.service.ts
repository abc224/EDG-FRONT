import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region } from '../models/region';
import { Prefecture } from '../models/prefecture';
export const apiUrl = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root',
})
export class RegionService {
  constructor(private httpClient: HttpClient) {}

  public findAll(): Observable<Region[]> {
    return this.httpClient.get<Region[]>(`${apiUrl}/allregions`);
  }

  public new(region: Region | FormData): Observable<Region> {
    return this.httpClient.post<Region>(`${apiUrl}/add_region`, region);
  }

  public findById(id: number): Observable<Region> {
    return this.httpClient.get<Region>(`${apiUrl}/regions/` + id);
  }
  public update(id: number, region: Region): Observable<Region> {
    return this.httpClient.put<Region>(`${apiUrl}/edit-region/` + id, region);
  }
  public delete(id: number): Observable<Region> {
    return this.httpClient.post<Region>(`${apiUrl}/delete-region/` + id, null);
  }

  getPrefecturesByRegion(regionId: number): Observable<any[]> {
    return this.httpClient.get<Prefecture[]>(
      `${apiUrl}/regions/${regionId}/prefectures`
    );
  }
}
