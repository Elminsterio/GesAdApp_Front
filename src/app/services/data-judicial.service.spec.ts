import { TestBed } from '@angular/core/testing';

import { DataJudicialService } from './data-judicial.service';

describe('DataJudicialService', () => {
  let service: DataJudicialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataJudicialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
