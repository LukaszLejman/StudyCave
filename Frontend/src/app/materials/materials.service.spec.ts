import { TestBed, inject } from '@angular/core/testing';

import { MaterialsService } from './materials.service';

describe('MaterialsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialsService]
    });
  });

  it('should be created', inject([MaterialsService], (service: MaterialsService) => {
    expect(service).toBeTruthy();
  }));
});
