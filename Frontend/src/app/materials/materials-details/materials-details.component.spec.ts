import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsDetailsComponent } from './materials-details.component';
import { MaterialsService } from '../materials.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';
import { RoutingStateService } from '../../routing-state.service';

describe('MaterialsDetailsComponent', () => {
  let component: MaterialsDetailsComponent;
  let fixture: ComponentFixture<MaterialsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialsDetailsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule, HttpClientModule, MatSnackBarModule, FormsModule],
      providers: [MaterialsService, AuthenticationService, RoutingStateService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
