import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  private newAttribute: any = {};
  private question: String = '';
  private points: Number = 1;

  @Output() private add: EventEmitter<Object> = new EventEmitter();
  @Output() private editing: EventEmitter<Object> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    if (this.edit) {
      this.content['edit'] = true;
      this.question = this.content['content']['question'];
      this.answers = [];
      const answ = this.content['content']['answers'];
      for (let i = 0; i < answ.length; i++) {
        this.answersCorrect.push({
          content: answ[i]['content'],
          is_good: answ[i]['is_good']
        });
      }
      this.points = this.content['content']['points'];
    } else {
      this.content = {};
      this.content['content'] = {
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
        alert('Nie można dodać pustej odpowiedzi!');
      } else {
        const length = (this.newAttribute['content'].trim().length === 0);
        if (length) {
          alert('Nie można dodać pustej odpowiedzi!');
        } else {
          this.newAttribute['is_good'] = this.isChecked;

          let exists = false;
          for (let i = 0; i < this.answersCorrect.length; i++) {
            if (this.newAttribute['content'] === this.answersCorrect[i]['content']) {
              exists = true;
              alert('Odpowiedź już istnieje!');
              break;
            }
          }

          if (!exists) {
            this.answersCorrect.push(this.newAttribute);
            this.newAttribute = {
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
      alert('Pytanie nie może być puste!');
    } else {
      if (this.answersCorrect.length < 2) {
        alert('Pytanie musi zawierać co najmniej 2 odpowiedzi!');
      } else {
        let checked = false;
        for (let i = 0; i < this.answersCorrect.length; i++) {
          if (this.answersCorrect[i]['is_good']) {
            checked = true;
            break;
          }
        }
        if (!checked) {
          alert('Zaznacz prawidłową odpowiedź!');
        } else {
          let t = true;
          let times = 0;
          for (let i = 0; i < this.answersCorrect.length; i++) {
            if (this.answersCorrect[i]['is_good']) {
              times++;
            }
            if (times > 1) {
              t = false;
              alert('Tylko 1 odpowiedź może być prawidłowa!');
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
              alert('Żadna z odpowiedzi nie może być pusta!');
            } else {
              this.content['content']['question'] = this.question;
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
