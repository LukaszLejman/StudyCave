import { TestBed, inject } from '@angular/core/testing';

import { MaterialsService } from './materials.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('MaterialsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialsService, AuthenticationService],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, HttpClientModule, MatSnackBarModule, FormsModule]
    });
  });

  it('should be created', inject([MaterialsService], (service: MaterialsService) => {
    expect(service).toBeTruthy();
  }));
});
