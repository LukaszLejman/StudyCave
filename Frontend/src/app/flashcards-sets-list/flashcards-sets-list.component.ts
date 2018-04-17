import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { Set } from '../set';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-flashcards-sets-list',
  templateUrl: './flashcards-sets-list.component.html',
  styleUrls: ['./flashcards-sets-list.component.css']
})
export class FlashcardsSetsListComponent implements OnInit, OnDestroy {

  sets = [{}];
  selectedSet: Set;
  flashcardSubscribtion: Subscription;

  constructor(private flashcardsService: FlashcardsService, private router: Router) { }

  onSelect(set: Set): void {
    this.selectedSet = set;
    this.router.navigate(['flashcards/sets', this.selectedSet.id]);
  }

  ngOnInit() {
    this.getSets();
  }

  getSets(): void {
    this.flashcardSubscribtion = this.flashcardsService.getSets()
      .subscribe(data => this.sets = data);
  }

  ngOnDestroy() {
    this.flashcardSubscribtion.unsubscribe();
  }
}
