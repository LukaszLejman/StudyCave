import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsTestTypeMenuComponent } from './flashcards-test-type-menu.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { AuthenticationService } from '../../authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('FlashcardsTestTypeMenuComponent', () => {
  let component: FlashcardsTestTypeMenuComponent;
  let fixture: ComponentFixture<FlashcardsTestTypeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsTestTypeMenuComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [FlashcardsService, AuthenticationService],
      imports: [ RouterTestingModule, FormsModule, HttpClientModule, MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsTestTypeMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
