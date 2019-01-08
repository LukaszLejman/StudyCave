import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDetailsComponent } from './test-details.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { TestsService } from '../tests.service';
import { AuthenticationService } from '../../authentication.service';
import { By } from '@angular/platform-browser';
import { RoutingStateService } from '../../routing-state.service';

describe('TestDetailsComponent', () => {
  let component: TestDetailsComponent;
  let fixture: ComponentFixture<TestDetailsComponent>;
  let mockTest: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDetailsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [TestsService, AuthenticationService, RoutingStateService],
      imports: [ RouterTestingModule, FormsModule, HttpClientModule, MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDetailsComponent);
    component = fixture.componentInstance;
    mockTest = {
      title: 'Test',
      body: [],
      owner: 'test'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should render test title', () => {
      component.test = mockTest;
      fixture.detectChanges();
      const testName = document.querySelector('h3').innerHTML;
      expect(testName).toEqual(mockTest.title);
    });
});
