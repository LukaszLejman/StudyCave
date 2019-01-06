import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOfActivityInGroupComponent } from './history-of-activity-in-group.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule, MatAutocompleteModule,
  MatFormFieldModule, MatInputModule, MatDatepicker, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { GroupsService } from '../groups.service';
import { AuthenticationService } from '../../authentication.service';

describe('HistoryOfActivityInGroupComponent', () => {
  let component: HistoryOfActivityInGroupComponent;
  let fixture: ComponentFixture<HistoryOfActivityInGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryOfActivityInGroupComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [GroupsService, AuthenticationService],
      imports: [RouterTestingModule, FormsModule, HttpClientModule,
         MatSnackBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, MatNativeDateModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryOfActivityInGroupComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
