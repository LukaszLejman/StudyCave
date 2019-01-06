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
import { PuzzleQuestionComponent } from '../puzzle-question/puzzle-question.component';
import { PairsQuestionComponent } from '../pairs-question/pairs-question.component';
import { GapsQuestionComponent } from '../gaps-question/gaps-question.component';

describe('TestMakerComponent', () => {
  let component: TestMakerComponent;
  let fixture: ComponentFixture<TestMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestMakerComponent, TrueFalseQuestionComponent, SingleChoiceQuestionComponent, MultipleChoiceQuestionComponent,
        PuzzleQuestionComponent, PairsQuestionComponent, GapsQuestionComponent ],
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

    it('should create puzzle question', async(() => {
      fixture.whenStable().then(() => {
        fixture.autoDetectChanges();
        spyOn(component, 'show').and.callThrough();
        fixture.debugElement.nativeElement.querySelectorAll('button')[3].click();
        expect(component.show).toHaveBeenCalledWith('puzzle');

        const childDebugElement = fixture.debugElement.query(By.directive(PuzzleQuestionComponent));

        childDebugElement.context.points = 2;

        childDebugElement.context.newAttribute.correct = 'a';
        childDebugElement.context.addFieldValue();

        childDebugElement.context.newAttribute.correct = 'b';
        childDebugElement.context.addFieldValue();

        childDebugElement.context.addTable();

        const testMock = [
          {
            content: {
              answers: [{
                id: null,
                correct: ['a', 'b']
              }],
              id: null,
              points: 2,
              question: 'Ułóż elementy w prawidłowej kolejności:',
              type: 'puzzle'
            },
            edit: false,
            nr: 1,
            shortcut: 'Ułóż elementy ...'
          }
        ];
        expect(component.test).toEqual(testMock);
      });
    }));

    it('should create gaps question', async(() => {
      fixture.whenStable().then(() => {
        fixture.autoDetectChanges();
        spyOn(component, 'show').and.callThrough();
        fixture.debugElement.nativeElement.querySelectorAll('button')[4].click();
        expect(component.show).toHaveBeenCalledWith('gaps');

        const childDebugElement = fixture.debugElement.query(By.directive(GapsQuestionComponent));

        childDebugElement.context.points = 2;

        childDebugElement.context.showVisibleTextInput();
        childDebugElement.context.noGapText = 'noGap1';
        childDebugElement.context.addToVisibleText();

        childDebugElement.context.showGapInput();
        childDebugElement.context.gapText = 'gap1;gap2';
        childDebugElement.context.addToGaps();

        childDebugElement.context.showVisibleTextInput();
        childDebugElement.context.noGapText = 'noGap2';
        childDebugElement.context.addToVisibleText();

        childDebugElement.context.addNewLine();

        childDebugElement.context.showVisibleTextInput();
        childDebugElement.context.noGapText = 'noGap3';
        childDebugElement.context.addToVisibleText();

        childDebugElement.context.showGapInput();
        childDebugElement.context.gapText = 'gap3;gap4';
        childDebugElement.context.addToGaps();

        childDebugElement.context.showVisibleTextInput();
        childDebugElement.context.noGapText = 'noGap4';
        childDebugElement.context.addToVisibleText();

        childDebugElement.context.addTable();

        const testMock = [
          {
            content: {
              answers: [
                {
                  id: null,
                  content: ['noGap1'],
                  is_gap: false
                },
                {
                  id: null,
                  content: ['gap1', 'gap2'],
                  is_gap: true
                },
                {
                  id: null,
                  content: ['noGap2'],
                  is_gap: false
                },
                {
                  id: null,
                  content: ['\n'],
                  is_gap: false
                },
                {
                  id: null,
                  content: ['noGap3'],
                  is_gap: false
                },
                {
                  id: null,
                  content: ['gap3', 'gap4'],
                  is_gap: true
                },
                {
                  id: null,
                  content: ['noGap4'],
                  is_gap: false
                }
              ],
              id: null,
              points: 2,
              question: 'Uzupełnij luki w tekście:',
              type: 'gaps'
            },
            edit: false,
            nr: 1,
            shortcut: 'Uzupełnij luki...'
          }
        ];

        expect(component.test).toEqual(testMock);
      });
    }));

    it('should create pairs question', async(() => {
      fixture.whenStable().then(() => {
        fixture.autoDetectChanges();
        spyOn(component, 'show').and.callThrough();
        fixture.debugElement.nativeElement.querySelectorAll('button')[5].click();
        expect(component.show).toHaveBeenCalledWith('pairs');

        const childDebugElement = fixture.debugElement.query(By.directive(PairsQuestionComponent));

        childDebugElement.context.points = 2;

        childDebugElement.context.newAttribute.first = 'a1';
        childDebugElement.context.newAttribute.second = 'a2';
        childDebugElement.context.addFieldValue();

        childDebugElement.context.newAttribute.first = 'b1';
        childDebugElement.context.newAttribute.second = 'b2';
        childDebugElement.context.addFieldValue();

        childDebugElement.context.addTable();

        const testMock = [
          {
            content: {
              answers: [
                {
                  id: null,
                  first: 'a1',
                  second: 'a2'
                },
                {
                  id: null,
                  first: 'b1',
                  second: 'b2'
                }
              ],
              id: null,
              points: 2,
              question: 'Połącz w pary:',
              type: 'pairs'
            },
            edit: false,
            nr: 1,
            shortcut: 'Połącz w pary:'
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
