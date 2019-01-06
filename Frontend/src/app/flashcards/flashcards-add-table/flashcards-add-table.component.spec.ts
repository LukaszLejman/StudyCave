import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsAddTableComponent } from './flashcards-add-table.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../../authentication.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

describe('FlashcardsAddTableComponent', () => {
  let component: FlashcardsAddTableComponent;
  let fixture: ComponentFixture<FlashcardsAddTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsAddTableComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [FlashcardsService, AuthenticationService],
      imports: [HttpClientModule, RouterTestingModule, MatSnackBarModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsAddTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Testowanie funkcji w klasie
  it('should change permissions', () => {
    expect(component.permission).toBe(false);
    component.changePermission();
    expect(component.permission).toBe(true);
    component.changePermission();
    expect(component.permission).toBe(false);
  });
});
