import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestsService } from '../tests.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit, OnDestroy {
  private id: number;
  private test;
  private questionsCount = 0;
  private isStarted = false;
  private currentQuestionIndex = 0;
  private isEnded = false;
  private points = 0;
  private maxPoints = 0;
  private prevMaxResult = 0;
  private prevAnswerResultBool;
  private currentUser;
  private sendResultSubscription: ISubscription;
  private removeTestSubscription: ISubscription;
  private getResultSubscription: ISubscription;
  private getTestWithoutAnswersSubscription: ISubscription;

  constructor(private route: ActivatedRoute, private router: Router, private testService: TestsService) { }

  handleEmitNextQuestionRequest(e) {
    this.points += e.points;
    this.prevAnswerResultBool = e.points > 0 ? true : false;
    if (this.currentQuestionIndex < this.questionsCount - 1) {
      this.currentQuestionIndex += 1;
    } else {
      this.isEnded = true;
      if (this.currentUser) {
        this.sendResultSubscription = this.testService.sendResult(this.test.id, this.points, this.currentUser.username).subscribe(d => {
          this.getMaxResult();
        });
      }
    }
  }

  start() {
    this.isStarted = true;
  }

  back() {
    this.router.navigate(['tests']);
  }

  edit() {
    this.router.navigate(['tests/edit', this.id]);
  }

  remove() {
    this.removeTestSubscription = this.testService.removeTest(this.id).subscribe(
      d => {
        this.router.navigate(['tests']);
      }
    );
  }

  getMaxResult() {
    if (this.currentUser) {
      this.getResultSubscription = this.testService.getResult(this.test.id, this.currentUser.username).subscribe(d => {
        this.prevMaxResult = d.userScore;
      });
    }
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.id = this.route.snapshot.params.id;
    this.getTestWithoutAnswersSubscription = this.testService.getTestWithoutAnswers(this.id).subscribe(
      d => {
        this.test = d;
        this.questionsCount = d.body.length;
        d.body.forEach(element => {
          this.maxPoints += element.points;
        });
        this.getMaxResult();
      }
    );
  }

  ngOnDestroy() {
    if (this.removeTestSubscription) {
      this.removeTestSubscription.unsubscribe();
    }
    if (this.sendResultSubscription) {
      this.sendResultSubscription.unsubscribe();
    }
    if (this.getResultSubscription) {
      this.getResultSubscription.unsubscribe();
    }
    this.getTestWithoutAnswersSubscription.unsubscribe();
  }

}
