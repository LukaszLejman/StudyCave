import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsPairsTestSetComponent } from './flashcards-pairs-test-set.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { AuthenticationService } from '../../authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('FlashcardsPairsTestSetComponent', () => {
  let component: FlashcardsPairsTestSetComponent;
  let fixture: ComponentFixture<FlashcardsPairsTestSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsPairsTestSetComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [FlashcardsService, AuthenticationService],
      imports: [ RouterTestingModule, FormsModule, HttpClientModule, MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsPairsTestSetComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
