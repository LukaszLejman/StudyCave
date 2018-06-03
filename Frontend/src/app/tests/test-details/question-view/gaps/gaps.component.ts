import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsService } from '../../../tests.service';
import * as $ from 'jquery';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-gaps',
  templateUrl: './gaps.component.html',
  styleUrls: ['./gaps.component.css']
})
export class GapsComponent implements OnInit, OnDestroy {
  @Input()
  private question;
  @Output() emitNextQuestionRequest = new EventEmitter();
  private id;
  private verifyAnswerSubscription: ISubscription;

  constructor(private route: ActivatedRoute, private testsService: TestsService) { }

  nextQuestion(f) {
    this.id = this.route.snapshot.params.id;
    const answers = this.question.answers.filter(element => {
      return element.is_gap;
    });
    const gapsContent = [];
    answers.forEach(element => {
      gapsContent.push({ id: element.id, content: f.value[element.id] });
    });
    const body = { id: this.question.id, type: 'gaps', answers: gapsContent };
    this.verifyAnswerSubscription = this.testsService.verifyAnswer(this.id, body).subscribe(d => {
      $('.answers').find('[type="text"]').prop('value', '');
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
