import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsService } from '../../../tests.service';
import * as $ from 'jquery';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css']
})
export class MultipleChoiceComponent implements OnInit, OnDestroy{
  @Input()
  private question;
  @Output() emitNextQuestionRequest = new EventEmitter();
  private id;
  private verifyAnswerSubscription: ISubscription;

  constructor(private route: ActivatedRoute, private testsService: TestsService) { }

  nextQuestion(f) {
    this.id = this.route.snapshot.params.id;
    const answers = this.question.answers;
    answers.forEach(element => {
      element.is_good = f.value[element.id] ? true : false;
    });
    const body = { id: this.question.id, type: 'multiple-choice', answers: answers };
    this.verifyAnswerSubscription = this.testsService.verifyAnswer(this.id, body).subscribe(d => {
      $('.answers').find('[type="checkbox"]').prop('checked', false);
      this.emitNextQuestionRequest.emit(d);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.verifyAnswerSubscription) {
      this.verifyAnswerSubscription.unsubscribe();
    }
  }

}
