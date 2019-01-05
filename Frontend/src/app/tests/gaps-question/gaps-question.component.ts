import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gaps-question',
  templateUrl: './gaps-question.component.html',
  styleUrls: ['./gaps-question.component.css']
})
export class GapsQuestionComponent implements OnInit {

  @Input()  content: Object = {};
  @Input()  edit: Boolean;

   visibleText: Boolean = false;
   gap: Boolean = false;

   noGapText = '';
   gapText = '';

   answersCorrect: Array<Object> = [];
   answers: Array<Object> = [];
   question: String = 'Uzupełnij luki w tekście:';
   points: Number = 1;
   id: Number = null;

  @Output()  add: EventEmitter<Object> = new EventEmitter();
  @Output()  editing: EventEmitter<Object> = new EventEmitter();

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.edit) {
      this.content['edit'] = true;
      this.question = this.content['content']['question'];
      const answ = this.content['content']['answers'];
      this.id = this.content['content']['id'];
      this.addToAnswersCorrect(answ);
      this.points = this.content['content']['points'];
    } else {
      this.content = {};
      this.content['content'] = {
        id: null,
        type: 'gaps',
        question: 'Uzupełnij luki w tekście.',
        answers: [],
        points: 1
      };
      this.content['edit'] = false;
    }
  }

  addToAnswersCorrect(answ): void {
    for (let i = 0; i < answ.length; i++) {
      if (answ[i]['is_gap']) {
        this.answersCorrect.push({
          id: answ[i]['id'],
          content: answ[i]['content'].join(';'),
          is_gap: true
        });
      } else {
        this.answersCorrect.push({
          id: answ[i]['id'],
          content: answ[i]['content'][0],
          is_gap: false
        });
      }
    }
  }

  showVisibleTextInput(): void {
    this.visibleText = true;
    this.gap = false;
  }

  showGapInput(): void {
    this.visibleText = false;
    this.gap = true;
  }

  addToVisibleText(): void {
    if ((this.noGapText === undefined) || (this.noGapText.trim().length === 0)) {
      this.snackBar.open('Tekst widoczny nie może być pusty!', null,
        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
    } else {
      this.answersCorrect.push({
        id: null,
        content: this.noGapText,
        is_gap: false
      });
      this.visibleText = false;
      this.noGapText = '';
    }
  }

  addToGaps(): void {
    if ((this.gapText === undefined) || (this.gapText.trim().length === 0)) {
      this.snackBar.open('Tekst luki nie może być pusty!', null,
        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
    } else {
      this.answersCorrect.push({
        id: null,
        content: this.gapText,
        is_gap: true
      });
      this.gapText = '';
      this.gap = false;
    }
  }

  addNewLine(): void {
    this.visibleText = false;
    this.gap = false;
    this.answersCorrect.push({
      id: null,
      content: '\n',
      is_gap: false
    });
  }

  removefromAnswers(index: number): void {
    this.answersCorrect.splice(index, 1);
  }

  moveUp(nr: number): void {
    const temp = this.answersCorrect[nr - 2];
    this.answersCorrect[nr - 2] = this.answersCorrect[nr - 1];
    this.answersCorrect[nr - 1] = temp;
  }

  moveDown(nr: number): void {
    const temp = this.answersCorrect[nr];
    this.answersCorrect[nr] = this.answersCorrect[nr - 1];
    this.answersCorrect[nr - 1] = temp;
  }

  addToAnswers(): void {
    for (let i = 0; i < this.answersCorrect.length; i++) {
      if (this.answersCorrect[i]['is_gap']) {
        this.answers.push({
          id: this.answersCorrect[i]['id'],
          content: this.answersCorrect[i]['content'].split(';'),
          is_gap: true
        });
      } else {
        this.answers.push({
          id: this.answersCorrect[i]['id'],
          content: [this.answersCorrect[i]['content']],
          is_gap: false
        });
      }
    }
  }

  addTable(): void {
    if ((this.question === undefined) || (this.question.trim().length === 0)) {
      this.snackBar.open('Pytanie nie może być puste!', null,
        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
    } else {
      let hasGap = false;
      for (let i = 0; i < this.answersCorrect.length; i++) {
        if ((this.answersCorrect[i]['is_gap']) && (this.answersCorrect[i]['content'].trim().length !== 0)) {
          hasGap = true;
          break;
        }
      }
      if (!hasGap) {
        this.snackBar.open('Zadanie musi zawierać co najmniej 1 niepustą lukę!', null,
          { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
      } else {
        let hasVisibleText = false;
        for (let i = 0; i < this.answersCorrect.length; i++) {
          if (!this.answersCorrect[i]['is_gap']) {
            if ((this.answersCorrect[i]['content'][0] !== '\n') &&
              (this.answersCorrect[i]['content'][0].trim().length !== 0)) {
              hasVisibleText = true;
              break;
            }
          }
        }
        if (!hasVisibleText) {
          this.snackBar.open('Zadanie musi zawierać co najmniej 1 niepusty tekst widoczny!', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        } else {
          this.addToAnswers();
          this.content['content']['question'] = this.question;
          this.content['content']['answers'] = this.answers;
          this.content['content']['points'] = this.points;
          this.content['content']['id'] = this.id;
          if (this.edit) {
            this.editing.emit(this.content);
          } else {
            this.add.emit(this.content);
          }
          this.clear();
        }
      }
    }
  }

  empty(): void {
    if (this.edit) {
      this.editing.emit({});
    } else {
      this.add.emit({});
    }
    this.clear();
  }

  clear(): void {
    this.content = {};
    this.edit = false;
    this.question = '';
    this.answers = [];
    this.noGapText = '';
    this.gapText = '';
    this.visibleText = false;
    this.gap = false;
  }

}
