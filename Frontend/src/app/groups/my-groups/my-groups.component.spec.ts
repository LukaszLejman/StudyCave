import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGroupsComponent } from './my-groups.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GroupsService } from '../groups.service';
import { AuthenticationService } from '../../authentication.service';
import { AuthGuard } from '../../auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { GroupCreatorComponent } from '../group-creator/group-creator.component';
import { JoinToGroupComponent } from '../join-to-group/join-to-group.component';
import { GroupServiceMockService } from '../group-service-mock.service';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('MyGroupsComponent', () => {
  let component: MyGroupsComponent;
  let fixture: ComponentFixture<MyGroupsComponent>;
  const routes: Routes = [{ path: 'my-groups', component: MyGroupsComponent, canActivate: [AuthGuard] },
  { path: 'create-group', component: GroupCreatorComponent, canActivate: [AuthGuard] },
  { path: 'join-to-group', component: JoinToGroupComponent, canActivate: [AuthGuard] },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyGroupsComponent, JoinToGroupComponent, GroupCreatorComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, HttpClientModule, MatSnackBarModule, RouterModule.forRoot(routes), FormsModule],
      providers: [GroupsService, AuthenticationService, AuthGuard,
        { provide: GroupsService, useClass: GroupServiceMockService },
        { provide: APP_BASE_HREF, useValue: 'my-groups' }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to create group component', async(() => {
    fixture.autoDetectChanges();
    const navigateSpy = spyOn(component.router, 'navigate').and.callThrough();
    fixture.debugElement.nativeElement.querySelectorAll('.btn-study-cave')[0].click();
    expect(navigateSpy).toHaveBeenCalledWith(['create-group']);
  }));

  it('should go to join to group component', async(() => {
    fixture.autoDetectChanges();
    const navigateSpy = spyOn(component.router, 'navigate').and.callThrough();
    fixture.debugElement.nativeElement.querySelectorAll('.btn-study-cave')[1].click();
    expect(navigateSpy).toHaveBeenCalledWith(['join-to-group']);
  }));
});
