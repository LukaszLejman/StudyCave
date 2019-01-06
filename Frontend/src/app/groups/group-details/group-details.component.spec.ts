import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDetailsComponent } from './group-details.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { GroupsService } from '../groups.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../../authentication.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('GroupDetailsComponent', () => {
  let component: GroupDetailsComponent;
  let fixture: ComponentFixture<GroupDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupDetailsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule, HttpClientModule, MatSnackBarModule],
      providers: [GroupsService, AuthenticationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
