import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.css']
})
export class TestsListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toTestMaker() {
    this.router.navigate(['test-maker']);
  }

}
