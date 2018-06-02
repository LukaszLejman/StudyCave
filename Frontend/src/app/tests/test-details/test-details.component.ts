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

  constructor(private route: ActivatedRoute, private router: Router, private testService: TestsService) { }

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
        console.log(d);
      }
    );
  }

}
