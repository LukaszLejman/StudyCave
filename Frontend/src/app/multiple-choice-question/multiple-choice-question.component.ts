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

  @Output() private add: EventEmitter<Object> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

}
