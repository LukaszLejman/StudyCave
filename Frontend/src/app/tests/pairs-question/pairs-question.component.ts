import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pairs-question',
  templateUrl: './pairs-question.component.html',
  styleUrls: ['./pairs-question.component.css']
})
export class PairsQuestionComponent implements OnInit {

  @Input() private content: Object = {};
  @Input() private edit: Boolean;

  private answers: Array<Object> = [];
  private answersCorrect: Array<Object> = [];
  private newAttribute: any = {
    id: null,
    first: '',
    second: ''
  };
  private question: String = 'Połącz w pary:';
  private points: Number = 1;
  private id: Number = null;

  @Output() private add: EventEmitter<Object> = new EventEmitter();
  @Output() private editing: EventEmitter<Object> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (this.edit) {
      this.answers = [];
      this.content['edit'] = true;
      this.question = this.content['content']['question'];
      this.id = this.content['content']['id'];
      const answ = this.content['content']['answers'];
      for (let i = 0; i < answ.length; i++) {
        this.answersCorrect.push({
          id: answ[i]['id'],
          first: answ[i]['first'],
          second: answ[i]['second']
        });
      }
      this.points = this.content['content']['points'];
    } else {
      this.content = {};
      this.content['content'] = {
        id: null,
        type: 'pairs',
        question: 'Połącz w pary.',
        answers: [],
        points: 1
      };
      this.content['edit'] = false;
    }
  }

  addFieldValue(): void {
    const undefinedAttr = ((this.newAttribute['first'] === undefined) || (this.newAttribute['second'] === undefined));
      if (undefinedAttr) {
        alert('Żaden z elementów dopasowania nie może być pusty!');
      } else {
        const length = ((this.newAttribute['first'].trim().length === 0) || (this.newAttribute['second'].trim().length === 0));
        if (length) {
          alert('Żaden z elementów dopasowania nie może być pusty!');
        } else {
          let exists = false;
          for (let i = 0; i < this.answersCorrect.length; i++) {
            if ((this.newAttribute['first'] === this.answersCorrect[i]['first']) ||
                (this.newAttribute['second'] === this.answersCorrect[i]['second'])) {
              exists = true;
              alert('Elementy dopasowania nie mogą się powtarzać!');
              break;
            }
          }
          if (!exists) {
            this.answersCorrect.push(this.newAttribute);
            this.newAttribute = {
              id: null,
              first: '',
              second: ''
            };
          }
        }
      }
    }

  deleteFieldValue(index): void {
    this.answersCorrect.splice(index, 1);
  }

  addTable(): void {
    if ((this.question === undefined) || (this.question.trim().length === 0)) {
      alert('Pytanie nie może być puste!');
    } else {
      if (this.answersCorrect.length < 2) {
        alert('Pytanie musi zawierać co najmniej 2 odpowiedzi!');
      } else {
        let empty = false;
        for (let i = 0; i < this.answersCorrect.length; i++) {
          if ((this.answersCorrect[i]['first'].trim().length === 0) ||
              (this.answersCorrect[i]['second'].trim().length === 0)) {
            empty = true;
            break;
          }
        }
        if (empty) {
          alert('Żadne pole dopasowania nie może być puste!');
        } else {
          let exists = false;
          for (let i = 0; i < this.answersCorrect.length; i++) {
            for (let j = 0; j < this.answersCorrect.length; j++) {
              if (i !== j) {
                if ((this.answersCorrect[i]['first'] === this.answersCorrect[j]['first']) ||
                  (this.answersCorrect[i]['second'] === this.answersCorrect[j]['second'])) {
                  exists = true;
                  alert('Elementy dopasowania nie mogą się powtarzać!');
                  break;
                }
              }
            }
            if (exists) {
              break;
            }
          }
          if (!exists) {
            this.content['content']['question'] = this.question;
            this.answers = this.answersCorrect;
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
    this.answersCorrect = [];
    this.newAttribute = {};
  }

}
