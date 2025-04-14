import { Component } from '@angular/core';
import { PREFECTURES, Region, REGIONS } from '../../shared/data';
@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrl: './data-entry.component.css',
})
export class DataEntryComponent {
  regionsIsLoading = false;
  regions: Region[] = REGIONS;
  prefectures = PREFECTURES;

  getPrefecturesByRegion(regionId: number) {
    return this.prefectures.filter((p) => p.regionId === regionId);
  }

  onDeleteRegion(_t80: Region) {
    throw new Error('Method not implemented.');
  }
}
