import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsService } from '../../../tests.service';
import * as $ from 'jquery';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-true-false',
  templateUrl: './true-false.component.html',
  styleUrls: ['./true-false.component.css']
})
export class TrueFalseComponent implements OnInit, OnDestroy {
  @Input()
  private question;
  private answer;
  @Output() emitNextQuestionRequest = new EventEmitter();
  private id;
  private verifyAnswerSubscription: ISubscription;

  constructor(private route: ActivatedRoute, private testsService: TestsService) { }

  nextQuestion() {
    this.id = this.route.snapshot.params.id;
    const answers = this.question.answers;
    answers.forEach(element => {
      element.is_good = element.content === this.answer ? true : false;
    });
    const body = { id: this.question.id, type: 'true-false', answers: answers };
    this.verifyAnswerSubscription = this.testsService.verifyAnswer(this.id, body).subscribe(d => {
      $('.btn-group').find('label').removeClass('active').end().find('[type="radio"]').prop('checked', false);
      this.answer = undefined;
      this.emitNextQuestionRequest.emit(d);
    });
  }

  chooseAnswer(answer: boolean) {
    this.answer = answer;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.verifyAnswerSubscription) {
      this.verifyAnswerSubscription.unsubscribe();
    }
  }

}
