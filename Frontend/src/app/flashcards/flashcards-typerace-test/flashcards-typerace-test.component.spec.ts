import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsTyperaceTestComponent } from './flashcards-typerace-test.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { AuthenticationService } from '../../authentication.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('FlashcardsTyperaceTestComponent', () => {
  let component: FlashcardsTyperaceTestComponent;
  let fixture: ComponentFixture<FlashcardsTyperaceTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsTyperaceTestComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [FlashcardsService, AuthenticationService],
      imports: [ RouterTestingModule, FormsModule, HttpClientModule, MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsTyperaceTestComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
