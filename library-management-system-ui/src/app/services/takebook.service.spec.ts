import { TestBed } from '@angular/core/testing';

import { TakebookService } from './takebook.service';

describe('TakebookService', () => {
  let service: TakebookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TakebookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
