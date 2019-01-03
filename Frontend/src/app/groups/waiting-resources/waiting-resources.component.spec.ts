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

describe('WaitingResourcesComponent', () => {
  let component: WaitingResourcesComponent;
  let fixture: ComponentFixture<WaitingResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingResourcesComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule, HttpClientModule, MatSnackBarModule],
      providers: [GroupsService, AuthenticationService, TestsService, FlashcardsService, MaterialsService]
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
});
