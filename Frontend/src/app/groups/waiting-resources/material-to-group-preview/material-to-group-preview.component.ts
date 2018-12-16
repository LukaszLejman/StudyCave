import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-material-to-group-preview',
  templateUrl: './material-to-group-preview.component.html',
  styleUrls: ['./material-to-group-preview.component.css']
})
export class MaterialToGroupPreviewComponent implements OnInit {

  @Input() public id: number;
  @Input() public title: string;

  public serverURL = 'http://studycave.eu-west-1.elasticbeanstalk.com/#/file/files/'; // działa na globalu
  // public serverURL = 'http://localhost:8080/file/files/' ; // działa na localhost

  constructor() {}

  ngOnInit() {}

}
