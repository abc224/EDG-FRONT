import { TestBed } from '@angular/core/testing';

import { SourceFinancementService } from './source-financement.service';

describe('SourceFinancementService', () => {
  let service: SourceFinancementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SourceFinancementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
