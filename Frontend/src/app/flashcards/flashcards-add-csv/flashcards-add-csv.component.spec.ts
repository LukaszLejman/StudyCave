import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsAddCsvComponent } from './flashcards-add-csv.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../../authentication.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('FlashcardsAddCsvComponent', () => {
  let component: FlashcardsAddCsvComponent;
  let fixture: ComponentFixture<FlashcardsAddCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsAddCsvComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [FlashcardsService, AuthenticationService],
      imports: [HttpClientModule, RouterTestingModule, MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsAddCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
