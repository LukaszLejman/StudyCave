import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDetailsComponent } from './group-details.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { GroupsService } from '../groups.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../../authentication.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from '../../app-routing.module';
import { RouterModule, Routes, Router } from '@angular/router';
import { AuthGuard } from '../../auth-guard.service';
import { APP_BASE_HREF } from '@angular/common';
import { GroupServiceMockService } from '../group-service-mock.service';
import { ManageGroupComponent } from '../manage-group/manage-group.component';
import { HistoryOfActivityInGroupComponent } from '../history-of-activity-in-group/history-of-activity-in-group.component';

describe('GroupDetailsComponent', () => {
  let component: GroupDetailsComponent;
  let fixture: ComponentFixture<GroupDetailsComponent>;
  const routes: Routes = [{ path: 'groups/:id', component: GroupDetailsComponent, canActivate: [AuthGuard] },
  { path: 'groups/manage/:id', component: ManageGroupComponent, canActivate: [AuthGuard] },
  { path: 'groups/history/:id', component: HistoryOfActivityInGroupComponent, canActivate: [AuthGuard] }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupDetailsComponent, ManageGroupComponent, HistoryOfActivityInGroupComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, HttpClientModule, MatSnackBarModule, RouterModule.forRoot(routes)],
      providers: [AuthenticationService,
        AuthGuard,
        { provide: GroupsService, useClass: GroupServiceMockService },
        { provide: APP_BASE_HREF, useValue: 'groups/1' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDetailsComponent);
    component = fixture.componentInstance;
    component.currentUser =
      localStorage.setItem('currentUser', JSON.stringify({
        username: 'lukasz', authorization: 'a'
      }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call mock service and display flashcards table', async(() => {
    fixture.autoDetectChanges();
    spyOn(component, 'isDisplayed').and.callThrough();
    fixture.debugElement.nativeElement.querySelectorAll('.buttons-container .btn-study-cave')[2].click();
    expect(component.isDisplayed).toHaveBeenCalledWith('fiszek');
  }));

  it('should call mock service and display tests table', async(() => {
    fixture.autoDetectChanges();
    spyOn(component, 'isDisplayed').and.callThrough();
    fixture.debugElement.nativeElement.querySelectorAll('.buttons-container .btn-study-cave')[3].click();
    expect(component.isDisplayed).toHaveBeenCalledWith('testów');
  }));

  it('should call mock service and display materials table', async(() => {
    fixture.autoDetectChanges();
    spyOn(component, 'isDisplayed').and.callThrough();
    fixture.debugElement.nativeElement.querySelectorAll('.buttons-container .btn-study-cave')[1].click();
    expect(component.isDisplayed).toHaveBeenCalledWith('materiałów');
  }));

  it('should navigate to group management', async(() => {
    fixture.autoDetectChanges();
    const router = TestBed.get(Router);
    fixture.debugElement.nativeElement.querySelectorAll('.buttons-container .btn-study-cave')[0].click();
    router.navigate(['groups/manage', 1]).then(() => {
      expect(router.url).toEqual('/groups/manage/1');
    });
  }));

  it('should navigate to user history', async(() => {
    fixture.autoDetectChanges();
    const router = TestBed.get(Router);
    fixture.debugElement.nativeElement.querySelectorAll('.btn-study-cave')[2].click();
    router.navigate(['groups/history', 1]).then(() => {
      expect(router.url).toEqual('/groups/history/1');
    });
  }));
});
