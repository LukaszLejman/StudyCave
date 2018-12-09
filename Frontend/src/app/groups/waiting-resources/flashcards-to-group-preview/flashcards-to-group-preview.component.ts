import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flashcards-to-group-preview',
  templateUrl: './flashcards-to-group-preview.component.html',
  styleUrls: ['./flashcards-to-group-preview.component.css']
})
export class FlashcardsToGroupPreviewComponent implements OnInit {

  @Input() public set: any;

  constructor() {}

  ngOnInit() {}

}
