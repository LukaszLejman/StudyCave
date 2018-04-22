import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flashcards-test-type-menu',
  templateUrl: './flashcards-test-type-menu.component.html',
  styleUrls: ['./flashcards-test-type-menu.component.css']
})
export class FlashcardsTestTypeMenuComponent implements OnInit {
  @Input() id: Number;
  @Output() cancel = new EventEmitter;

  cancelMenu() {
    this.cancel.emit(false);
  }

  goToTestGen() {
    this.router.navigate(['flashcards/test-gen/flashcards-pairs', this.id]);
  }

  goToTestGenFill() {
    this.router.navigate(['flashcards/test-gen/flashcards-filling-in', this.id]);
  }
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
