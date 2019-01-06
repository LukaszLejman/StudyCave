import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsPairsTestComponent } from './flashcards-pairs-test.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { AuthenticationService } from '../../authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('FlashcardsPairsTestComponent', () => {
  let component: FlashcardsPairsTestComponent;
  let fixture: ComponentFixture<FlashcardsPairsTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsPairsTestComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [FlashcardsService, AuthenticationService],
      imports: [ RouterTestingModule, FormsModule, HttpClientModule, MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsPairsTestComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
