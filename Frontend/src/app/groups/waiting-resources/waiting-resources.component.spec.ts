import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingResourcesComponent } from './waiting-resources.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GroupsService } from '../groups.service';
import { AuthenticationService } from '../../authentication.service';
import { TestsService } from '../../tests/tests.service';
import { MaterialsService } from '../../materials/materials.service';
import { FlashcardsService } from '../../flashcards/flashcards.service';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth-guard.service';
import { GroupServiceMockService } from '../group-service-mock.service';
import { APP_BASE_HREF } from '@angular/common';

describe('WaitingResourcesComponent', () => {
  let component: WaitingResourcesComponent;
  let fixture: ComponentFixture<WaitingResourcesComponent>;
  const routes: Routes = [
    { path: 'groups/waiting-resources/:id', component: WaitingResourcesComponent, canActivate: [AuthGuard] },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingResourcesComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule, HttpClientModule, MatSnackBarModule, RouterModule.forRoot(routes)],
      providers: [GroupsService, AuthenticationService, TestsService, FlashcardsService, MaterialsService, AuthGuard,
        { provide: GroupsService, useClass: GroupServiceMockService },
        { provide: APP_BASE_HREF, useValue: 'groups/add-resources/0' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show resources', async(() => {
    fixture.autoDetectChanges();
    spyOn(component, 'getWaitingMaterials').and.callThrough();
    fixture.debugElement.nativeElement.querySelectorAll('button')[1].click();
    expect(component.getWaitingMaterials).toHaveBeenCalled();
  }));

  it('should show flashcards', async(() => {
    fixture.autoDetectChanges();
    spyOn(component, 'getWaitingFlashcards').and.callThrough();
    fixture.debugElement.nativeElement.querySelectorAll('button')[2].click();
    expect(component.getWaitingFlashcards).toHaveBeenCalled();
  }));

  it('should show tests', async(() => {
    fixture.autoDetectChanges();
    spyOn(component, 'getWaitingTests').and.callThrough();
    fixture.debugElement.nativeElement.querySelectorAll('button')[3].click();
    expect(component.getWaitingTests).toHaveBeenCalled();
  }));
});
