import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-flashcards-pairs-test-set',
  templateUrl: './flashcards-pairs-test-set.component.html',
  styleUrls: ['./flashcards-pairs-test-set.component.css']
})
export class FlashcardsPairsTestSetComponent implements OnInit, OnChanges {

  @Input() package: Array<any>;
  @Input() package_id: number;
  @Output() goodEvent = new EventEmitter();
  @Output() isChecked = new EventEmitter();

  private checked: Boolean = false;
  private setLeft: Array<Object> = [];
  private setRight: Array<Object> = [];
  private good = 2;

  constructor() {  }

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
    this.isChecked.emit(true); // roboczo
    const side = 'left';
    const n = this.setLeft.length;
    const body = [];
    for (let i = 0; i < n; i++) {
      body.push({
        id: this.setLeft[i]['id'],
        answer: value[`right-side-${i}`],
        side: side
      });
      // albo get(body[i])
    }
    console.log(body);
    this.goodEvent.emit(this.good); // roboczo -> normalnie będzie działać showWrong()
    // albo post(body); albo get(JSON.stringify(body)); --> showWrong(answer); answer - odp. z serwera
    // sprawdzanie formularza - jeszcze nie ma backendu; do zrobienia nowa metoda w serwisie
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
