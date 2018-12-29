import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsFillingInTestComponent } from './flashcards-filling-in-test.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../../authentication.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('FlashcardsFillingInTestComponent', () => {
  let component: FlashcardsFillingInTestComponent;
  let fixture: ComponentFixture<FlashcardsFillingInTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsFillingInTestComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [FlashcardsService, AuthenticationService],
      imports: [ RouterTestingModule, FormsModule, HttpClientModule, MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsFillingInTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
