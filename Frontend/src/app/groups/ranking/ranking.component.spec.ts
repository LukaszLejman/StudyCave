import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingComponent } from './ranking.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule, MatFormFieldModule } from '@angular/material';
import { GroupsService } from '../groups.service';
import { AuthenticationService } from '../../authentication.service';
import { APP_BASE_HREF } from '@angular/common';
import { GroupDetailsComponent } from '../group-details/group-details.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { WaitingResourcesComponent } from '../waiting-resources/waiting-resources.component';
import { AuthGuard } from '../../auth-guard.service';
import { ManageGroupComponent } from '../manage-group/manage-group.component';
import { GroupServiceMockService } from '../group-service-mock.service';

describe('RankingComponent', () => {
  let component: RankingComponent;
  let fixture: ComponentFixture<RankingComponent>;
  const routes: Routes = [{ path: 'groups/:id', component: GroupDetailsComponent, canActivate: [AuthGuard] },
  { path: 'groups/manage/:id', component: ManageGroupComponent, canActivate: [AuthGuard] },
  { path: 'groups/waiting-resources/:id', component: WaitingResourcesComponent, canActivate: [AuthGuard] },
  { path: 'groups/ranking/:id', component: RankingComponent, canActivate: [AuthGuard] },
  ];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RankingComponent, ManageGroupComponent, GroupDetailsComponent, WaitingResourcesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, FormsModule, HttpClientModule, MatSnackBarModule, MatFormFieldModule, RouterModule.forRoot(routes)],
      providers: [GroupsService, AuthenticationService, AuthGuard,
        { provide: GroupsService, useClass: GroupServiceMockService },
        { provide: APP_BASE_HREF, useValue: 'groups/ranking/0' }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show global ranking', async(() => {
    fixture.autoDetectChanges();
    spyOn(component, 'showGlobalRanking').and.callThrough();
    fixture.debugElement.nativeElement.querySelector('#option1').click();
    expect(component.showGlobalRanking).toHaveBeenCalled();
  }));

  it('should show tests ranking', async(() => {
    fixture.autoDetectChanges();
    spyOn(component, 'showOnlyTestsRanking').and.callThrough();
    fixture.debugElement.nativeElement.querySelector('#option2').click();
    expect(component.showOnlyTestsRanking).toHaveBeenCalled();
  }));
});
