import { TestBed, inject } from '@angular/core/testing';

import { FlashcardsService } from './flashcards.service';

describe('FlashcardsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlashcardsService]
    });
  });

  it('should be created', inject([FlashcardsService], (service: FlashcardsService) => {
    expect(service).toBeTruthy();
  }));
});
