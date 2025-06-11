import { TestBed } from '@angular/core/testing';

import { PrefectureService } from './prefecture.service';

describe('PrefectureService', () => {
  let service: PrefectureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrefectureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
