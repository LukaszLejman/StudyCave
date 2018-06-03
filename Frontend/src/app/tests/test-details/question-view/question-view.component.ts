import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.css']
})
export class QuestionViewComponent implements OnInit {
  @Input()
  private question;
  @Input()
  private questionIndex;
  @Output() emitNextQuestionRequest = new EventEmitter();

  constructor() { }

  nextQuestion(e) {
    this.emitNextQuestionRequest.emit(e);
  }

  handleEmitNextQuestionRequest(e) {
    this.nextQuestion(e);
  }

  ngOnInit() {
  }

}
