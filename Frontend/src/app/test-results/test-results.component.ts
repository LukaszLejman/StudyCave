import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})
export class TestResultsComponent implements OnInit {
  @Input() result: number;
  @Input() maxPts: number;

  constructor() { }

  ngOnInit() {
  }

}
