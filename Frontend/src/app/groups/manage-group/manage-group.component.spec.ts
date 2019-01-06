import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGroupComponent } from './manage-group.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GroupsService } from '../groups.service';
import { AuthenticationService } from '../../authentication.service';
import { ConfirmationService } from 'primeng/api';

describe('ManageGroupComponent', () => {
  let component: ManageGroupComponent;
  let fixture: ComponentFixture<ManageGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageGroupComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule, HttpClientModule, MatSnackBarModule],
      providers: [GroupsService, AuthenticationService, ConfirmationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
