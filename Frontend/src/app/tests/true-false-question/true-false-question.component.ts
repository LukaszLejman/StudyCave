import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-true-false-question',
  templateUrl: './true-false-question.component.html',
  styleUrls: ['./true-false-question.component.css']
})
export class TrueFalseQuestionComponent implements OnInit {

  @Input()  content: Object = {};
  @Input()  edit: Boolean;

   isChecked: Boolean = false;
   id: Number = null;

  @Output()  add: EventEmitter<Object> = new EventEmitter();
  @Output()  editing: EventEmitter<Object> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    if (this.edit) {
      this.content['edit'] = true;
      this.id = this.content['content']['id'];
    } else {
      this.content = {};
      this.content['content'] = {
        id: null,
        type: 'true-false',
        question: '',
        answers:  [
          {id: null, content: 'Prawda', is_good: false},
          {id: null, content: 'Fałsz', is_good: false}
        ],
        points: 1
      };
      this.content['edit'] = false;
    }
  }

  changeCheckbox(i: number): void {
    if (i === 0) {
      this.isChecked = true;
    }
  }

  addTable(value: any): void {
    if (this.isChecked) {
      this.content['content'] = {
        id: this.id,
        type: 'true-false',
        question: value['question'],
        answers:  [
          {id: this.content['content']['answers'][0]['id'], content: 'Prawda', is_good: true},
          {id: this.content['content']['answers'][1]['id'], content: 'Fałsz', is_good: false}
        ],
        points: value['points']
      };
    } else {
      this.content['content'] = {
        id: this.id,
        type: 'true-false',
        question: value['question'],
        answers:  [
          {id: this.content['content']['answers'][0]['id'], content: 'Prawda', is_good: false},
          {id: this.content['content']['answers'][1]['id'], content: 'Fałsz', is_good: true}
        ],
        points: value['points']
      };
    }
    if (this.edit) {
      this.editing.emit(this.content);
    } else {
      this.add.emit(this.content);
    }
    this.clear();
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
  }

}
