import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMakerComponent } from './test-maker.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { TestsService } from '../tests.service';
import { AuthenticationService } from '../../authentication.service';

import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TrueFalseQuestionComponent } from '../true-false-question/true-false-question.component';
import { SingleChoiceQuestionComponent } from '../single-choice-question/single-choice-question.component';
import { MultipleChoiceQuestionComponent } from '../multiple-choice-question/multiple-choice-question.component';

describe('TestMakerComponent', () => {
  let component: TestMakerComponent;
  let fixture: ComponentFixture<TestMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestMakerComponent, TrueFalseQuestionComponent, SingleChoiceQuestionComponent, MultipleChoiceQuestionComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule, HttpClientModule, MatSnackBarModule, FormsModule, NoopAnimationsModule],
      providers: [TestsService, AuthenticationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should create true-false question', async(() => {
      fixture.whenStable().then(() => {
        fixture.autoDetectChanges();
        spyOn(component, 'show').and.callThrough();
        fixture.debugElement.nativeElement.querySelector('button').click();
        expect(component.show).toHaveBeenCalledWith('true-false');

        const childDebugElement = fixture.debugElement.query(By.directive(TrueFalseQuestionComponent));

        childDebugElement.context.content.content.points = 2;
        childDebugElement.context.content.content.question = 'Test?';
        const trueCheckbox = childDebugElement.nativeElement.querySelector('input[value=true]');
        trueCheckbox.click();
        expect(trueCheckbox.checked).toBeTruthy();

        const values = {
          question: 'Test?',
          points: 2
        };
        childDebugElement.context.addTable(values);
        const testMock = [
          {
            content: {
              answers: [
                {
                  id: null,
                  content: 'Prawda',
                  is_good: true
                },
                {
                  id: null,
                  content: 'Fałsz',
                  is_good: false
                }
              ],
              id: null,
              points: 2,
              question: 'Test?',
              type: 'true-false'
            },
            edit: false,
            nr: 1,
            shortcut: 'Test?'
          }
        ];
        expect(component.test).toEqual(testMock);
      });
    }));

    it('should create single-choice question', async(() => {
      fixture.whenStable().then(() => {
        fixture.autoDetectChanges();
        spyOn(component, 'show').and.callThrough();
        fixture.debugElement.nativeElement.querySelectorAll('button')[1].click();
        expect(component.show).toHaveBeenCalledWith('single-choice');

        const childDebugElement = fixture.debugElement.query(By.directive(SingleChoiceQuestionComponent));

        childDebugElement.context.points = 2;
        childDebugElement.context.question = 'Test?';

        childDebugElement.context.newAttribute.content = 'a';
        childDebugElement.context.addFieldValue();

        childDebugElement.context.newAttribute.content = 'b';
        spyOn(childDebugElement.context, 'changeCheckbox2').and.callThrough();
        const trueCheckbox = childDebugElement.nativeElement.querySelectorAll('input[type=checkbox]')[0];
        trueCheckbox.click();
        expect(trueCheckbox.checked).toBeTruthy();
        expect(childDebugElement.context.changeCheckbox2).toHaveBeenCalled();
        childDebugElement.context.addFieldValue();

        childDebugElement.context.addTable();

        const testMock = [
          {
            content: {
              answers: [
                {
                  id: null,
                  content: 'a',
                  is_good: false
                },
                {
                  id: null,
                  content: 'b',
                  is_good: true
                }
              ],
              id: null,
              points: 2,
              question: 'Test?',
              type: 'single-choice'
            },
            edit: false,
            nr: 1,
            shortcut: 'Test?'
          }
        ];

        expect(component.test).toEqual(testMock);
      });
    }));

    it('should create multiple-choice question', async(() => {
      fixture.whenStable().then(() => {
        fixture.autoDetectChanges();
        spyOn(component, 'show').and.callThrough();
        fixture.debugElement.nativeElement.querySelectorAll('button')[2].click();
        expect(component.show).toHaveBeenCalledWith('multiple-choice');

        const childDebugElement = fixture.debugElement.query(By.directive(MultipleChoiceQuestionComponent));

        childDebugElement.context.points = 2;
        childDebugElement.context.question = 'Test?';

        childDebugElement.context.newAttribute.content = 'a';
        spyOn(childDebugElement.context, 'changeCheckbox2').and.callThrough();
        const trueCheckbox1 = childDebugElement.nativeElement.querySelectorAll('input[type=checkbox]')[0];
        trueCheckbox1.click();
        expect(trueCheckbox1.checked).toBeTruthy();
        expect(childDebugElement.context.changeCheckbox2).toHaveBeenCalled();
        childDebugElement.context.addFieldValue();

        childDebugElement.context.newAttribute.content = 'b';
        childDebugElement.context.addFieldValue();

        childDebugElement.context.addTable();

        const testMock = [
          {
            content: {
              answers: [
                {
                  id: null,
                  content: 'a',
                  is_good: true
                },
                {
                  id: null,
                  content: 'b',
                  is_good: true
                }
              ],
              id: null,
              points: 2,
              question: 'Test?',
              type: 'multiple-choice'
            },
            edit: false,
            nr: 1,
            shortcut: 'Test?'
          }
        ];

        expect(component.test).toEqual(testMock);
      });
    }));

    it('should count the points for the test', () => {
      component.test = [
        {
          content: {
            points: 1
          }
        },
        {
          content: {
            points: 5
          }
        },
        {
          content: {
            points: 2
          }
        },
        {
          content: {
            points: 1
          }
        }
      ];

      component.countPoints();

      expect(component.pointsAll).toEqual(9);
    });
});
