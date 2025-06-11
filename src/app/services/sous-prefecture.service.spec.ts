import { TestBed } from '@angular/core/testing';

import { SousPrefectureService } from './sous-prefecture.service';

describe('SousPrefectureService', () => {
  let service: SousPrefectureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SousPrefectureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
