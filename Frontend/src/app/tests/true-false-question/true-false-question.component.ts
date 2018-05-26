import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-true-false-question',
  templateUrl: './true-false-question.component.html',
  styleUrls: ['./true-false-question.component.css']
})
export class TrueFalseQuestionComponent implements OnInit {

  @Input() private content: Object = {};
  @Input() private edit: Boolean;

  private isChecked: Boolean = false;

  @Output() private add: EventEmitter<Object> = new EventEmitter();
  @Output() private editing: EventEmitter<Object> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    if (this.edit) {
      this.content['edit'] = true;
    } else {
      this.content = {};
      this.content['content'] = {
        type: 'true-false',
        question: '',
        answers:  [
          {content: 'Prawda', is_good: false},
          {content: 'Fałsz', is_good: false}
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
        type: 'true-false',
        question: value['question'],
        answers:  [
          {content: 'Prawda', is_good: true},
          {content: 'Fałsz', is_good: false}
        ],
        points: value['points']
      };
    } else {
      this.content['content'] = {
        type: 'true-false',
        question: value['question'],
        answers:  [
          {content: 'Prawda', is_good: false},
          {content: 'Fałsz', is_good: true}
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
