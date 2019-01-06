import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharingResourcesInGroupsComponent } from './sharing-resources-in-groups.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GroupsService } from '../groups.service';
import { AuthenticationService } from '../../authentication.service';

describe('SharingResourcesInGroupsComponent', () => {
  let component: SharingResourcesInGroupsComponent;
  let fixture: ComponentFixture<SharingResourcesInGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharingResourcesInGroupsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule, HttpClientModule, MatSnackBarModule],
      providers: [GroupsService, AuthenticationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharingResourcesInGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
