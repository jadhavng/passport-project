import { TestBed } from '@angular/core/testing';

import { DataAccessServiceService } from './data-access-service.service';

describe('DataAccessServiceService', () => {
  let service: DataAccessServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataAccessServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
