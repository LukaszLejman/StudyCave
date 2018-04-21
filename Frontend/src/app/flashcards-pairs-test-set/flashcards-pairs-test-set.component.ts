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

  private setLeft: Array<Object> = [];
  private setRight: Array<Object> = [];
  private good = 2;

  constructor() {  }

  ngOnInit() {
    this.setLeft = this.package[this.package_id]['setLeft'];
    this.setRight = this.package[this.package_id]['setRight'];
  }

  ngOnChanges(changes: SimpleChanges) {
    const package_idChanges = changes['package_id'];
    if (package_idChanges) {
      this.ngOnInit();
      this.goodEvent.emit(this.good);
    }
  }

  check(value: any) {
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
    // albo post(body); albo get(JSON.stringify(body)); this.good = wynik z backendu
    // sprawdzanie formularza - jeszcze nie ma backendu; do zrobienia nowa metoda w serwisie
  }

}
