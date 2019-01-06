import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOfActivityInGroupComponent } from './history-of-activity-in-group.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule, MatAutocompleteModule, MatFormFieldModule } from '@angular/material';

describe('HistoryOfActivityInGroupComponent', () => {
  let component: HistoryOfActivityInGroupComponent;
  let fixture: ComponentFixture<HistoryOfActivityInGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryOfActivityInGroupComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule, FormsModule, HttpClientModule, MatSnackBarModule, MatFormFieldModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryOfActivityInGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
