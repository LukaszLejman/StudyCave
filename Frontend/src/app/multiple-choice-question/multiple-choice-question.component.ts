import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-multiple-choice-question',
  templateUrl: './multiple-choice-question.component.html',
  styleUrls: ['./multiple-choice-question.component.css']
})
export class MultipleChoiceQuestionComponent implements OnInit {

  @Input() private content: Object = {};
  @Input() private edit: Boolean;

  private isChecked: Boolean = false;
  private answers: Array<Object> = [];
  private newAttribute: any = {};
  private question: String = '';

  @Output() private add: EventEmitter<Object> = new EventEmitter();
  @Output() private editing: EventEmitter<Object> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    if (this.edit) {
      this.content['edit'] = true;
      this.question = this.content['content']['question'];
      this.answers = this.content['content']['answers'];
    } else {
      this.content = {};
      this.content['content'] = {
        type: 'multiple-choice',
        question: '',
        answers: []
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
          for (let i = 0; i < this.answers.length; i++) {
            if (this.newAttribute['content'] === this.answers[i]['content']) {
              exists = true;
              alert('Odpowiedź już istnieje!');
              break;
            }
          }

          if (!exists) {
            this.answers.push(this.newAttribute);
            this.newAttribute = {
              content: '',
              is_good: this.isChecked
            };
          }
        }
      }
    }

  deleteFieldValue(index): void {
    this.answers.splice(index, 1);
  }

  changeCheckbox(i: number): void {
    this.answers[i]['is_good'] = !this.answers[i]['is_good'];
  }

  changeCheckbox2(event): void {
    if (event.target.checked) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }

  addTable() {
    if ((this.question === undefined) || (this.question.trim().length === 0)) {
      alert('Pytanie nie może być puste!');
    } else {
      if (this.answers.length < 2) {
        alert('Pytanie musi zawierać co najmniej 2 odpowiedzi!');
      } else {
        let checked = false;
        for (let i = 0; i < this.answers.length; i++) {
          if (this.answers[i]['is_good']) {
            checked = true;
            break;
          }
        }
        if (!checked) {
          alert('Zaznacz prawidłową odpowiedź!');
        } else {
          this.content['content']['question'] = this.question;
          this.content['content']['answers'] = this.answers;
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

  empty() {
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
    this.newAttribute = {};
  }


}
