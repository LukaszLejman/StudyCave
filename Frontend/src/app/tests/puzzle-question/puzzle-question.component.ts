import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-puzzle-question',
  templateUrl: './puzzle-question.component.html',
  styleUrls: ['./puzzle-question.component.css']
})
export class PuzzleQuestionComponent implements OnInit {

  @Input() private content: Object = {};
  @Input() private edit: Boolean;

  private answers: Array<Object> = [];
  private answersCorrect: Array<Object> = [];
  private answersCorrect2: Array<String> = [];
  private newAttribute: Object = {
    correct: ''
  };
  private question: String = 'Ułóż elementy w prawidłowej kolejności.';
  private points: Number = 1;
  private id: Number = null;
  private idAnsw: Number = null;

  @Output() private add: EventEmitter<Object> = new EventEmitter();
  @Output() private editing: EventEmitter<Object> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (this.edit) {
      this.content['edit'] = true;
      this.question = this.content['content']['question'];
      this.id = this.content['content']['id'];
      this.answers = [];
      const answ = this.content['content']['answers'][0]['correct'];
      this.idAnsw = this.content['content']['answers'][0]['id'];
      for (let i = 0; i < answ.length; i++) {
        this.answersCorrect.push({
          correct: answ[i]
        });
      }
      this.points = this.content['content']['points'];
    } else {
      this.content = {};
      this.content['content'] = {
        type: 'puzzle',
        question: 'Ułóż elementy w prawidłowej kolejności.',
        answers: [],
        points: 1
      };
      this.content['edit'] = false;
    }
  }

  addFieldValue(): void {
    const undefinedAttr = (this.newAttribute['correct'] === undefined);
      if (undefinedAttr) {
        alert('Żaden element rozsypanki nie może być pusty!');
      } else {
        const length = (this.newAttribute['correct'].trim().length === 0);
        if (length) {
          alert('Żaden element rozsypanki nie może być pusty!');
        } else {
          const exists = false;
          /*for (let i = 0; i < this.answersCorrect.length; i++) {
            if (this.newAttribute['correct'] === this.answersCorrect[i]['correct']) {
              exists = true;
              alert('Elementy rozsypanki nie mogą się powtarzać!');
              break;
            }
          }*/

          if (!exists) {
            this.answersCorrect.push(this.newAttribute);
            this.newAttribute = {};
          }
        }
      }
    }

  deleteFieldValue(index): void {
    this.answersCorrect.splice(index, 1);
  }

  addToAnswers(): void {
    for (let i = 0; i < this.answersCorrect.length; i++) {
      this.answersCorrect2.push(this.answersCorrect[i]['correct']);
    }
  }

  addTable(): void {
    if ((this.question === undefined) || (this.question.trim().length === 0)) {
      alert('Pytanie nie może być puste!');
    } else {
      if (this.answersCorrect.length < 2) {
        alert('Rozsypanka musi zawierać co najmniej 2 elementy!');
      } else {
        let empty = false;
        for (let i = 0; i < this.answersCorrect.length; i++) {
          if (this.answersCorrect[i]['correct'].trim().length === 0) {
            empty = true;
            break;
          }
        }
        if (empty) {
          alert('Żaden element rozsypanki nie może być pusty!');
        } else {
          this.addToAnswers();
          this.answers.push({
            id: this.idAnsw,
            correct: this.answersCorrect2
          });
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
