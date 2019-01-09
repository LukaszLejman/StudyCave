import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCreatorComponent } from './group-creator.component';
import { GroupsService } from '../groups.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from '../../authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('GroupCreatorComponent', () => {
  let component: GroupCreatorComponent;
  let fixture: ComponentFixture<GroupCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupCreatorComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [GroupsService, AuthenticationService],
      imports: [RouterTestingModule, FormsModule, HttpClientModule, MatSnackBarModule, NoopAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create group', async(() => {
    fixture.whenStable().then(() => {
      fixture.autoDetectChanges();
      spyOn(component, 'add').and.callThrough();
      fixture.debugElement.nativeElement.querySelectorAll('.form-control')[0].value = 'group-name';
      fixture.debugElement.nativeElement.querySelectorAll('.form-control')[1].value = 'group-descripion';
      fixture.debugElement.nativeElement.querySelectorAll('.btn-study-cave')[0].click();
      expect(component.add).toHaveBeenCalled();
    });

  }));

});
