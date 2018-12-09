import { Component, OnInit, Input } from '@angular/core';
import { Test } from '../../../tests/test_model';

@Component({
  selector: 'app-test-to-group-preview',
  templateUrl: './test-to-group-preview.component.html',
  styleUrls: ['./test-to-group-preview.component.css']
})
export class TestToGroupPreviewComponent implements OnInit {

  @Input() public test: Test;

  constructor() { }

  ngOnInit() {}

}
