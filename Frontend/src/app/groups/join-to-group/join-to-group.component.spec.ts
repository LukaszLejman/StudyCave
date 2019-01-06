import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinToGroupComponent } from './join-to-group.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GroupsService } from '../groups.service';
import { AuthenticationService } from '../../authentication.service';
import { FormsModule } from '@angular/forms';

describe('JoinToGroupComponent', () => {
  let component: JoinToGroupComponent;
  let fixture: ComponentFixture<JoinToGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinToGroupComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule, HttpClientModule, MatSnackBarModule, FormsModule],
      providers: [GroupsService, AuthenticationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinToGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be called spy', async(() => {
    fixture.whenStable().then(() => {
      fixture.autoDetectChanges();
      const spy = spyOn(component, 'joinToGroup').and.callThrough();
      expect(spy);
    });
  }));
});
