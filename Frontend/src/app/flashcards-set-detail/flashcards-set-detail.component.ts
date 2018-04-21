import { Component, OnInit, OnDestroy } from '@angular/core';
import { Set } from '../set';
import { ActivatedRoute } from '@angular/router';
import { FlashcardsService } from '../flashcards.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-flashcards-set-detail',
  templateUrl: './flashcards-set-detail.component.html',
  styleUrls: ['./flashcards-set-detail.component.css']
})
export class FlashcardsSetDetailComponent implements OnInit, OnDestroy {
  id: number;
  set: Array<any>;
  flashcardSubscribtion: Subscription;
  testTypeMenu = false;

  showTestTypeMenu() {
    this.testTypeMenu = true;
  }

  handleCancelFlashcardsTestyTypeMenu(e) {
    this.testTypeMenu = e;
  }

  constructor(private route: ActivatedRoute, private flashcardsService: FlashcardsService) { }
  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.flashcardSubscribtion = this.flashcardsService.getSet(this.id).subscribe(data => { this.set = data; });
  }

  ngOnDestroy() {
    this.flashcardSubscribtion.unsubscribe();
  }

}
