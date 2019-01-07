import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestsService } from '../tests.service';
import { ISubscription } from 'rxjs/Subscription';
import { Test } from '../test_model';
import { Test2PDF } from '../test2PDF';
import { RoutingStateService } from '../../routing-state.service';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit, OnDestroy {
  id: number;
  test;
  questionsCount = 0;
  isStarted = false;
  currentQuestionIndex = 0;
  isEnded = false;
  points = 0;
  maxPoints = 0;
  prevMaxResult = 0;
  prevAnswerResultBool;
  currentUser;
  sendResultSubscription: ISubscription;
  removeTestSubscription: ISubscription;
  getResultSubscription: ISubscription;
  getTestWithoutAnswersSubscription: ISubscription;
  display = false;

  constructor(private route: ActivatedRoute, private router: Router, private testService: TestsService,
    private routingState: RoutingStateService) { }

  openPopup() {
    this.display = true;
  }

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
    const previousUrl = this.routingState.getPreviousUrl();
    this.router.navigate([previousUrl]);
  }

  edit() {
    this.router.navigate(['tests/edit', this.id]);
  }

  deleteTest() {
    this.display = false;
    this.remove();
  }
  remove() {
    this.removeTestSubscription = this.testService.removeTest(this.id).subscribe(
      d => {
        const previousUrl = this.routingState.getPreviousUrl();
        this.router.navigate([previousUrl]);
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

  get() {
    this.testService.getTest(this.id).subscribe(
      success => {
        success.body = this.sortArrayByProperty(success.body, 'nr');
        this.getPDF(success);
      },
      error => {
        console.log(error);
      }
    );
  }

  sortArrayByProperty(array: Object[], property: string): Object[] {
    return array.sort(function(a, b) {
      if (a[property] < b[property]) {
        return -1;
      }
      if (a[property] > b[property]) {
        return 1;
      }
      return 0;
    });
  }

  getPDF(test: Test) {
    const pdf = new Test2PDF();
    pdf.getPDF(test);
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
