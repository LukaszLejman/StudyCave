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
  private prevAnswerResultBool;

  constructor(private route: ActivatedRoute, private router: Router, private testService: TestsService) { }

  handleEmitNextQuestionRequest(e) {
    this.points += e.points;
    this.prevAnswerResultBool = e.points > 0 ? true : false;
    if (this.currentQuestionIndex < this.questionsCount - 1) {
      this.currentQuestionIndex += 1;
    } else {
      this.isEnded = true;
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

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.testService.getTestWithoutAnswers(this.id).subscribe(
      d => {
        this.test = d;
        this.questionsCount = d.body.length;
        d.body.forEach(element => {
          this.maxPoints += element.points;
        });
      }
    );
  }

}
