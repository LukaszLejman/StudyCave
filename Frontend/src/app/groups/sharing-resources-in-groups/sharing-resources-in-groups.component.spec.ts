import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharingResourcesInGroupsComponent } from './sharing-resources-in-groups.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GroupsService } from '../groups.service';
import { AuthenticationService } from '../../authentication.service';
import { AuthGuard } from '../../auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { GroupServiceMockService } from '../group-service-mock.service';
import { APP_BASE_HREF } from '@angular/common';

describe('SharingResourcesInGroupsComponent', () => {
  let component: SharingResourcesInGroupsComponent;
  let fixture: ComponentFixture<SharingResourcesInGroupsComponent>;
  const routes: Routes = [
    { path: 'groups/add-resources/:id', component: SharingResourcesInGroupsComponent, canActivate: [AuthGuard] },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SharingResourcesInGroupsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, HttpClientModule, MatSnackBarModule, RouterModule.forRoot(routes)],
      providers: [GroupsService, AuthenticationService, AuthGuard,
        { provide: GroupsService, useClass: GroupServiceMockService },
        { provide: APP_BASE_HREF, useValue: 'groups/add-resources/0' }]
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

  it('should show resources', async(() => {
    fixture.autoDetectChanges();
    spyOn(component, 'getMaterialsToAdd').and.callThrough();
    fixture.debugElement.nativeElement.querySelectorAll('button')[1].click();
    expect(component.getMaterialsToAdd).toHaveBeenCalled();
  }));

  it('should show flashcards', async(() => {
    fixture.autoDetectChanges();
    spyOn(component, 'getFlashcardsToAdd').and.callThrough();
    fixture.debugElement.nativeElement.querySelectorAll('button')[2].click();
    expect(component.getFlashcardsToAdd).toHaveBeenCalled();
  }));

  it('should show tests', async(() => {
    fixture.autoDetectChanges();
    spyOn(component, 'getTestsToAdd').and.callThrough();
    fixture.debugElement.nativeElement.querySelectorAll('button')[3].click();
    expect(component.getTestsToAdd).toHaveBeenCalled();
  }));
});
