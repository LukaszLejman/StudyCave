import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestsService } from '../tests.service';

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.css']
})
export class TestsListComponent implements OnInit {
  private tests = [];

  constructor(private router: Router, private testService: TestsService) { }

  ngOnInit() {
    this.testService.getTests().subscribe(
      d => {
        this.tests = d;
        console.log(d);
      }
    );
  }

  toTestMaker() {
    this.router.navigate(['test-maker']);
  }

}
