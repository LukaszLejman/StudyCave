import { TestBed, inject } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

describe('SharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedService, AuthenticationService],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule, HttpClientModule, MatSnackBarModule, FormsModule],
    });
  });

  it('should be created', inject([SharedService], (service: SharedService) => {
    expect(service).toBeTruthy();
  }));
});
