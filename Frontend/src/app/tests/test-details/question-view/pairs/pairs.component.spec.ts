import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PairsComponent } from './pairs.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { TestsService } from '../../../tests.service';
import { AuthenticationService } from '../../../../authentication.service';

describe('PairsComponent', () => {
  let component: PairsComponent;
  let fixture: ComponentFixture<PairsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PairsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule, HttpClientModule, MatSnackBarModule, FormsModule],
      providers: [TestsService, AuthenticationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
