import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDetailsComponent } from './test-details.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { TestsService } from '../tests.service';
import { AuthenticationService } from '../../authentication.service';

describe('TestDetailsComponent', () => {
  let component: TestDetailsComponent;
  let fixture: ComponentFixture<TestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDetailsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule, HttpClientModule, MatSnackBarModule, FormsModule],
      providers: [TestsService, AuthenticationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
