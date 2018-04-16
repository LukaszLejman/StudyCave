import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { Set } from '../set';
@Component({
  selector: 'app-flashcards-sets-list',
  templateUrl: './flashcards-sets-list.component.html',
  styleUrls: ['./flashcards-sets-list.component.css']
})
export class FlashcardsSetsListComponent implements OnInit {

  sets = [{}];
  selectedSet: Set;
  constructor(private flashcardsService: FlashcardsService) { }

  onSelect(set: Set): void {
    this.selectedSet = set;
  }

  ngOnInit() {
    this.getSets();
  }

  getSets(): void {
    this.flashcardsService.getSets()
      .subscribe(data => this.sets = data);
  }

}
