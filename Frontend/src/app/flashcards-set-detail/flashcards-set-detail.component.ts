import { Component, OnInit, Input } from '@angular/core';
import { Set } from '../set';

@Component({
  selector: 'app-flashcards-set-detail',
  templateUrl: './flashcards-set-detail.component.html',
  styleUrls: ['./flashcards-set-detail.component.css']
})
export class FlashcardsSetDetailComponent implements OnInit {

  constructor() { }
  @Input() set: Set;
  ngOnInit() {
  }

}
