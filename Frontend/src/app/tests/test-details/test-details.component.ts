import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestsService } from '../tests.service';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {
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

  constructor(private route: ActivatedRoute, private router: Router, private testService: TestsService) { }

  handleEmitNextQuestionRequest(e) {
    this.points += e.points;
    this.prevAnswerResultBool = e.points > 0 ? true : false;
    if (this.currentQuestionIndex < this.questionsCount - 1) {
      this.currentQuestionIndex += 1;
    } else {
      this.isEnded = true;
      if (this.currentUser) {
        this.testService.sendResult(this.test.id, this.points, this.currentUser.username).subscribe(d => {
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
    this.testService.removeTest(this.id).subscribe(
      d => {
        this.router.navigate(['tests']);
      }
    );
  }

  getMaxResult() {
    if (this.currentUser) {
      this.testService.getResult(this.test.id, this.currentUser.username).subscribe(d => {
        this.prevMaxResult = d.userScore;
      });
    }
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.id = this.route.snapshot.params.id;
    this.testService.getTestWithoutAnswers(this.id).subscribe(
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

}
