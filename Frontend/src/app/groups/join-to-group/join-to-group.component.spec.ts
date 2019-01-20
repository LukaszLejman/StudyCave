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

  it('should call join to group', async(() => {
    fixture.autoDetectChanges();
    spyOn(component, 'joinToGroup').and.callThrough();
    fixture.debugElement.nativeElement.querySelector('input').value = 'XYZ';
    fixture.debugElement.nativeElement.querySelectorAll('.btn-study-cave')[0].click();
    expect(component.joinToGroup).toHaveBeenCalled();
  }));
});
