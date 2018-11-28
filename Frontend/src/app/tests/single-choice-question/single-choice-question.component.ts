import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-single-choice-question',
  templateUrl: './single-choice-question.component.html',
  styleUrls: ['./single-choice-question.component.css']
})
export class SingleChoiceQuestionComponent implements OnInit {

  @Input() private content: Object = {};
  @Input() private edit: Boolean;

  private isChecked: Boolean = false;
  private answers: Array<Object> = [];
  private answersCorrect: Array<Object> = [];
  private newAttribute: any = {
    id: null,
    content: '',
    is_good: false
  };
  private question: String = '';
  private points: Number = 1;
  private id: Number = null;

  @Output() private add: EventEmitter<Object> = new EventEmitter();
  @Output() private editing: EventEmitter<Object> = new EventEmitter();

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.edit) {
      this.content['edit'] = true;
      this.question = this.content['content']['question'];
      this.answers = [];
      const answ = this.content['content']['answers'];
      this.id = this.content['content']['id'];
      for (let i = 0; i < answ.length; i++) {
        this.answersCorrect.push({
          id: answ[i]['id'],
          content: answ[i]['content'],
          is_good: answ[i]['is_good']
        });
      }
      this.points = this.content['content']['points'];
    } else {
      this.content = {};
      this.content['content'] = {
        id: this.id,
        type: 'single-choice',
        question: '',
        answers: [],
        points: 1
      };
      this.content['edit'] = false;
    }
  }

  addFieldValue(): void {
    const undefinedAttr = (this.newAttribute['content'] === undefined);
    if (undefinedAttr) {
      this.snackBar.open('Nie można dodać pustej odpowiedzi!', null,
        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
    } else {
      const length = (this.newAttribute['content'].trim().length === 0);
      if (length) {
        this.snackBar.open('Nie można dodać pustej odpowiedzi!', null,
          { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
      } else {
        this.newAttribute['is_good'] = this.isChecked;

        let exists = false;
        for (let i = 0; i < this.answersCorrect.length; i++) {
          if (this.newAttribute['content'] === this.answersCorrect[i]['content']) {
            exists = true;
            this.snackBar.open('Odpowiedź już istnieje!', null,
              { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
            break;
          }
        }

        if (!exists) {
          this.answersCorrect.push(this.newAttribute);
          this.newAttribute = {
            id: null,
            content: '',
            is_good: this.isChecked
          };
        }
      }
    }
  }

  deleteFieldValue(index): void {
    this.answersCorrect.splice(index, 1);
  }

  changeCheckbox(i: number): void {
    this.answersCorrect[i]['is_good'] = !this.answersCorrect[i]['is_good'];
  }

  changeCheckbox2(event): void {
    if (event.target.checked) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }

  addTable(): void {
    if ((this.question === undefined) || (this.question.trim().length === 0)) {
      this.snackBar.open('Pytanie nie może być puste!', null,
        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
    } else {
      if (this.answersCorrect.length < 2) {
        this.snackBar.open('Pytanie musi zawierać co najmniej 2 odpowiedzi!', null,
          { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
      } else {
        let checked = false;
        for (let i = 0; i < this.answersCorrect.length; i++) {
          if (this.answersCorrect[i]['is_good']) {
            checked = true;
            break;
          }
        }
        if (!checked) {
          this.snackBar.open('Zaznacz prawidłową odpowiedź!', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        } else {
          let t = true;
          let times = 0;
          for (let i = 0; i < this.answersCorrect.length; i++) {
            if (this.answersCorrect[i]['is_good']) {
              times++;
            }
            if (times > 1) {
              t = false;
              this.snackBar.open('Tylko 1 odpowiedź może być prawidłowa!', null,
                { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
              break;
            }
          }
          if (t) {
            let empty = false;
            for (let i = 0; i < this.answersCorrect.length; i++) {
              if (this.answersCorrect[i]['content'].trim().length === 0) {
                empty = true;
                break;
              }
            }
            if (empty) {
              this.snackBar.open('Żadna z odpowiedzi nie może być pusta!', null,
                { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
            } else {
              this.content['content']['question'] = this.question;
              this.content['content']['id'] = this.id;
              this.answers = this.answersCorrect;
              this.content['content']['answers'] = this.answers;
              this.content['content']['points'] = this.points;
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
    this.isChecked = false;
    this.question = '';
    this.answers = [];
    this.answersCorrect = [];
    this.newAttribute = {};
  }

}
