import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsService } from '../../../tests.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-single-choice',
  templateUrl: './single-choice.component.html',
  styleUrls: ['./single-choice.component.css']
})
export class SingleChoiceComponent implements OnInit {
  @Input()
  private question;
  private answer;
  @Output() emitNextQuestionRequest = new EventEmitter();
  private id;

  constructor(private route: ActivatedRoute, private testsService: TestsService) { }

  nextQuestion(f) {
    this.id = this.route.snapshot.params.id;
    const answers = this.question.answers;
    answers.forEach(element => {
      element.is_good = element.content === f.value.answer ? true : false;
    });
    const body = { id: this.question.id, type: 'single-choice', answers: answers };
    this.testsService.verifyAnswer(this.id, body).subscribe(d => {
      $('.answers').find('[type="radio"]').prop('checked', false);
      this.emitNextQuestionRequest.emit(d);
    });
  }

  ngOnInit() {
  }

}
