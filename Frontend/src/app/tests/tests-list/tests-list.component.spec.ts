import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsListComponent } from './tests-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { TestsService } from '../tests.service';
import { AuthenticationService } from '../../authentication.service';

describe('TestsListComponent', () => {
  let component: TestsListComponent;
  let fixture: ComponentFixture<TestsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsListComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule, HttpClientModule, MatSnackBarModule, FormsModule],
      providers: [TestsService, AuthenticationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
