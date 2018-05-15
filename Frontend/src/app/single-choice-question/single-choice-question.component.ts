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

  @Output() private add: EventEmitter<Object> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

}
