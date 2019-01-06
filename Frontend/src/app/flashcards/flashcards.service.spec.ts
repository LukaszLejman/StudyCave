import { TestBed, inject } from '@angular/core/testing';

import { FlashcardsService } from './flashcards.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthenticationService } from '../authentication.service';

describe('FlashcardsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlashcardsService, AuthenticationService],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule, FormsModule, HttpClientModule, MatSnackBarModule]
    });
  });

  it('should be created', inject([FlashcardsService], (service: FlashcardsService) => {
    expect(service).toBeTruthy();
  }));
});
