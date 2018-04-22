import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-flashcards-pairs-test-set',
  templateUrl: './flashcards-pairs-test-set.component.html',
  styleUrls: ['./flashcards-pairs-test-set.component.css']
})
export class FlashcardsPairsTestSetComponent implements OnInit, OnChanges {

  @Input() id: number;
  @Input() package: Array<any>;
  @Input() package_id: number;
  @Output() goodEvent = new EventEmitter();
  @Output() isChecked = new EventEmitter();

  private flashcardSubscribtion: Subscription;
  private answer: Array<Object> = [];
  private checked: Boolean = false;
  private setLeft: Array<Object> = [];
  private setRight: Array<Object> = [];
  private good = 0;

  constructor(private uploadService: FlashcardsService) {  }

  ngOnInit() {
    this.isChecked.emit(false);
    this.checked = false;
    this.setLeft = this.package[this.package_id]['setLeft'];
    this.setRight = this.package[this.package_id]['setRight'];
  }

  ngOnChanges(changes: SimpleChanges) {
    const package_idChanges = changes['package_id'];
    if (package_idChanges) {
      this.ngOnInit();
    }
  }

  check(value: any) {
    const side = 'left';
    const n = this.setLeft.length;
    const body = [];
    this.answer = [];
    this.good = 0;
    for (let i = 0; i < n; i++) {
      body.push({
        content: value[`right-side-${i}`],
        id: this.setLeft[i]['id'],
        side: side
      });
      this.flashcardSubscribtion = this.uploadService.testCheck(this.id, body[i]).subscribe(data => {
        this.answer.push(data);
        if (i === (n - 1)) {
          this.showWrong(this.answer);
        }
      });
    }
  }

  showWrong(flashcards: Array<Object>) {
    const n = flashcards.length;
    for (let i = 0; i < n; i++) {
      this.isGood(flashcards[i]['is_good'], i);
    }
    this.checked = true;
    this.isChecked.emit(true);
    this.goodEvent.emit(this.good);
  }

  isGood(flashcard: Boolean, i: number) {
    if (!flashcard) {
      document.getElementById(`right-side-${i}`).style.border = 'red';
      document.getElementById(`err-${i}`).innerHTML = 'Źle :(';
    } else {
      this.good += 1;
    }
  }

}
