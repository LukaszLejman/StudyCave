import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { Set } from '../set';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FilterPipe } from '../../filter.pipe';

@Component({
  selector: 'app-flashcards-sets-list',
  templateUrl: './flashcards-sets-list.component.html',
  styleUrls: ['./flashcards-sets-list.component.css']
})
export class FlashcardsSetsListComponent implements OnInit, OnDestroy {

  sets = [{}];
  setsEmpty = true;
  selectedSet: Set;
  flashcardSubscription: Subscription;
  user: Boolean;
  ShowStatus: Boolean = false;
  owner;
  constructor(private flashcardsService: FlashcardsService, private router: Router) { }


  onSelect(set: Set): void {
    this.selectedSet = set;
    this.router.navigate(['flashcards/sets', this.selectedSet.id]);
    this.flashcardsService.setOwner(this.selectedSet.owner);
  }
  IsLogin() {
    if (localStorage.getItem('currentUser')) {
    this.user = true;
    } else {
    this.user = false;
    }
  }
  ShowPublic() {
    this.ShowStatus = false;
  }
  ShowPrivate() {
    this.ShowStatus = true;
  }

  ngOnInit() {
    this.getSets();
    this.IsLogin();
  }

  getSets(): void {
    this.flashcardSubscription = this.flashcardsService.getSets()
      .subscribe(data => {
        this.sets = data;
        if (this.sets.length > 0) {
          this.setsEmpty = false;
        } else {
          this.setsEmpty = true;
        }
      });
  }

  ngOnDestroy() {
    this.flashcardSubscription.unsubscribe();
  }
}
