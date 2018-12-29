import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChoiceQuestionComponent } from './single-choice-question.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { TestsService } from '../tests.service';
import { AuthenticationService } from '../../authentication.service';

describe('SingleChoiceQuestionComponent', () => {
  let component: SingleChoiceQuestionComponent;
  let fixture: ComponentFixture<SingleChoiceQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleChoiceQuestionComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule, HttpClientModule, MatSnackBarModule, FormsModule],
      providers: [TestsService, AuthenticationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleChoiceQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
