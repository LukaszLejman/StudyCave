import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsService } from '../../../tests.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css']
})
export class MultipleChoiceComponent implements OnInit {
  @Input()
  private question;
  @Output() emitNextQuestionRequest = new EventEmitter();
  private id;

  constructor(private route: ActivatedRoute, private testsService: TestsService) { }

  nextQuestion(f) {
    this.id = this.route.snapshot.params.id;
    const answers = this.question.answers;
    answers.forEach(element => {
      element.is_good = f.value[element.id] ? true : false;
    });
    const body = { id: this.question.id, type: 'multiple-choice', answers: answers };
    this.testsService.verifyAnswer(this.id, body).subscribe(d => {
      $('.answers').find('[type="checkbox"]').prop('checked', false);
      this.emitNextQuestionRequest.emit(d);
    });
  }

  ngOnInit() {
  }

}
