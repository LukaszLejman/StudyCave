import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGroupComponent } from './manage-group.component';
import { NO_ERRORS_SCHEMA, ChangeDetectionStrategy } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GroupsService } from '../groups.service';
import { AuthenticationService } from '../../authentication.service';
import { ConfirmationService } from 'primeng/api';
import { AuthGuard } from '../../auth-guard.service';
import { GroupServiceMockService } from '../group-service-mock.service';
import { APP_BASE_HREF } from '@angular/common';
import { GroupDetailsComponent } from '../group-details/group-details.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { WaitingResourcesComponent } from '../waiting-resources/waiting-resources.component';

describe('ManageGroupComponent', () => {
  let component: ManageGroupComponent;
  let fixture: ComponentFixture<ManageGroupComponent>;
  const routes: Routes = [{ path: 'groups/:id', component: GroupDetailsComponent, canActivate: [AuthGuard] },
  { path: 'groups/manage/:id', component: ManageGroupComponent, canActivate: [AuthGuard] },
  { path: 'groups/waiting-resources/:id', component: WaitingResourcesComponent, canActivate: [AuthGuard] },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageGroupComponent, GroupDetailsComponent, WaitingResourcesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, HttpClientModule, MatSnackBarModule, RouterModule.forRoot(routes)],
      providers: [GroupsService, AuthenticationService, ConfirmationService, AuthGuard,
        { provide: GroupsService, useClass: GroupServiceMockService },
        { provide: APP_BASE_HREF, useValue: 'groups/manage/0' }]
    })
    .overrideComponent(ManageGroupComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to group details', async(() => {
    fixture.autoDetectChanges();
    const navigateSpy = spyOn(component.router, 'navigate').and.callThrough();
    component.id = 0;
    fixture.debugElement.nativeElement.querySelectorAll('.buttons-container .btn-study-cave')[0].click();
    expect(navigateSpy).toHaveBeenCalledWith(['/groups/', 0]);
  }));

  it('should generate new key', async(() => {
    fixture.autoDetectChanges();
    spyOn(component, 'newKeyGenerate').and.callThrough();
    component.id = 0;
    let promise;
    let resolve;
    promise = new Promise(r => resolve = r);
    fixture.debugElement.nativeElement.querySelectorAll('.buttons-container .btn-study-cave')[1].click();
    fixture.debugElement.nativeElement.querySelectorAll('.buttons-container .btn-study-cave')[1].dispatchEvent(new Event('click'));
    expect(component.newKeyGenerate).toHaveBeenCalled();
    promise.then(() => {
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('.content p').textContent).toEqual('Klucz: XYZ');
    });
  }));

  it('should navigate to waiting resorces', async(() => {
    fixture.autoDetectChanges();
    const navigateSpy = spyOn(component.router, 'navigate').and.callThrough();
    component.id = 0;
    fixture.debugElement.nativeElement.querySelectorAll('.buttons-container .btn-study-cave')[2].click();
    expect(navigateSpy).toHaveBeenCalledWith(['/groups/waiting-resources/', 0]);
  }));

  it('should show dialog with group removal', async(() => {
    fixture.autoDetectChanges();
    spyOn(component, 'showDialog').and.callThrough();
    component.id = 0;
    fixture.debugElement.nativeElement.querySelectorAll('.buttons-container .btn-study-cave')[3].click();
    expect(component.showDialog).toHaveBeenCalled();
  }));
});
