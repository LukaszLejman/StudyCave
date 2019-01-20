import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOfActivityInGroupComponent } from './history-of-activity-in-group.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
  MatSnackBarModule, MatAutocompleteModule,
  MatFormFieldModule, MatInputModule, MatDatepicker, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import { GroupsService } from '../groups.service';
import { AuthenticationService } from '../../authentication.service';
import { AuthGuard } from '../../auth-guard.service';
import { APP_BASE_HREF } from '@angular/common';
import { GroupServiceMockService } from '../group-service-mock.service';

describe('HistoryOfActivityInGroupComponent', () => {
  let component: HistoryOfActivityInGroupComponent;
  let fixture: ComponentFixture<HistoryOfActivityInGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryOfActivityInGroupComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [AuthenticationService,
        AuthGuard,
        { provide: GroupsService, useClass: GroupServiceMockService },
        { provide: APP_BASE_HREF, useValue: 'groups/history/0' }
      ],
      imports: [RouterTestingModule, FormsModule, HttpClientModule,
        MatSnackBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
        NoopAnimationsModule, ReactiveFormsModule, MatNativeDateModule]
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

  it('should display user activity', async(() => {
    fixture.autoDetectChanges();
    spyOn(component, 'getHistory').and.callThrough();
    fixture.debugElement.nativeElement.querySelectorAll('.btn-study-cave')[1].click();
    expect(component.getHistory).toHaveBeenCalledWith(true);
  }));

  it('should display mock data', async(() => {
    fixture.autoDetectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.col-lg-8 b').textContent).toEqual('01/02/2019');
  }));
});
