import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SETS } from '../sets-list';

@Component({
  selector: 'app-flashcards-sets-list',
  templateUrl: './flashcards-sets-list.component.html',
  styleUrls: ['./flashcards-sets-list.component.css']
})
export class FlashcardsSetsListComponent implements OnInit {

  sets = SETS;

  constructor() { }

  ngOnInit() {
  }

}
