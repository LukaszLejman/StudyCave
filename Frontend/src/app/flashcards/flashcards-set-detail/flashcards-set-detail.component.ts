import { Component, OnInit, OnDestroy } from '@angular/core';
import { Set } from '../set';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardsService } from '../flashcards.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-flashcards-set-detail',
  templateUrl: './flashcards-set-detail.component.html',
  styleUrls: ['./flashcards-set-detail.component.css']
})
export class FlashcardsSetDetailComponent implements OnInit, OnDestroy {
  id: number;
  set: any;
  flashcardSubscribtion: Subscription;
  testTypeMenu = false;

  showTestTypeMenu() {
    this.testTypeMenu = true;
  }

  handleCancelFlashcardsTestyTypeMenu(e) {
    this.testTypeMenu = e;
  }

  navigateToEditMode() {
    this.router.navigate(['flashcards/sets/edit', this.id]);
  }

  constructor(private route: ActivatedRoute, private flashcardsService: FlashcardsService, private router: Router) { }
  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.flashcardSubscribtion = this.flashcardsService.getSet(this.id).subscribe(data => { this.set = data; });
  }

  ngOnDestroy() {
    this.flashcardSubscribtion.unsubscribe();
  }
  deleteSet() {
    const data = this.id;
    this.flashcardSubscribtion = this.flashcardsService.deleteSet(data);
  }

}
