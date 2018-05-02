import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-flashcards-memory-test-set',
  templateUrl: './flashcards-memory-test-set.component.html',
  styleUrls: ['./flashcards-memory-test-set.component.css']
})
export class FlashcardsMemoryTestSetComponent implements OnInit, OnChanges, OnDestroy {

  @Input() package: Array<any>;
  @Input() id: number;
  @Input() package_id: number;

  @Output() goodEvent = new EventEmitter();
  @Output() isChecked = new EventEmitter();

  private flashcardSubscribtion: Array<Subscription> = [];
  private answer: Array<Object> = [];
  private set: Array<Object> = [];
  private checked: Boolean = false;
  private good = 0;

  constructor(private uploadService: FlashcardsService) {  }

  ngOnInit() {
    this.isChecked.emit(false);
    this.checked = false;
    this.flashcardSubscribtion = [];
    this.set = this.package[this.package_id]['set'];
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnDestroy();
    const package_idChanges = changes['package_id'];
    if (package_idChanges) {
      this.ngOnInit();
    }
  }

  check(value: any) { // do zmiany
    const side = 'left';
    const n = this.set.length;
    const body = [];
    this.answer = [];
    this.good = 0;
    for (let i = 0; i < n; i++) {
      body.push({
        content: value[`right-side-${this.set[i]['id']}`],
        id: this.set[i]['id'],
        side: side
      });
      this.flashcardSubscribtion[i] = this.uploadService.testCheck(this.id, body[i]).subscribe(data => {
        this.answer.push(data);
        if (this.answer.length === n) {
          this.showWrong(this.answer);
        }
      });
    }
  }

  showWrong(flashcards: Array<Object>) { // do zmiany
    const n = flashcards.length;
    for (let i = 0; i < n; i++) {
      this.isGood(flashcards[i]['result'], flashcards[i]['id']);
    }
    this.checked = true;
    this.isChecked.emit(true);
    this.goodEvent.emit(this.good);
  }

  isGood(flashcard: Boolean, i: number) { // do zmiany
    if (!flashcard) {
      document.getElementById(`right-side-${i}`).style.border = '2px solid red';
      document.getElementById(`comment-${i}`).innerHTML = 'Źle :(';
      document.getElementById(`comment-${i}`).style.color = 'red';
    } else {
      document.getElementById(`right-side-${i}`).style.border = '2px solid green';
      document.getElementById(`comment-${i}`).innerHTML = 'Dobrze :)';
      document.getElementById(`comment-${i}`).style.color = 'green';
      this.good += 1;
    }
  }

  ngOnDestroy() {
    for (let i = 0; i < this.flashcardSubscribtion.length; i++) {
      this.flashcardSubscribtion[i].unsubscribe();
    }
  }

}
