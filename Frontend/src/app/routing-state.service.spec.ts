import { TestBed, inject } from '@angular/core/testing';

import { RoutingStateService } from './routing-state.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('RoutingStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoutingStateService],
      imports: [RouterTestingModule]
    });
  });

  it('should be created', inject([RoutingStateService], (service: RoutingStateService) => {
    expect(service).toBeTruthy();
  }));
});
