import { Component, OnInit } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';

@Component({
  selector: 'app-flashcards-add-table',
  templateUrl: './flashcards-add-table.component.html',
  styleUrls: ['./flashcards-add-table.component.css']
})
export class FlashcardsAddTableComponent implements OnInit {

  private table: Boolean = false;
  private tableToSend: any = {};
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  constructor(private flashcardsService: FlashcardsService) { }

  ngOnInit() {}

  addFieldValue() {
  const undefinedAttr = ((this.newAttribute['left_side'] === undefined) || (this.newAttribute['right_side'] === undefined));
    if (undefinedAttr) {
      alert('Nie można dodać fiszki z pustym polem!');
    } else {
      const length = ((this.newAttribute['left_side'].trim().length === 0) || (this.newAttribute['right_side'].trim().length === 0));
      if (length) {
        alert('Nie można dodać fiszki z pustym polem!');
      } else {
        this.fieldArray.push(this.newAttribute);
        this.newAttribute = {};
      }
    }
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  addTable(value: any) {
    // obsługa formularza dodawania fiszek do tabeli
    if (this.fieldArray.length === 0) {
      alert('Zestaw fiszek nie może być pusty!');
    } else {
      this.tableToSend = {
        name: value.title,
        category: value.category,
        owner: 0,
        flashcards: this.fieldArray
      };
      this.flashcardsService.add(this.tableToSend);
    }
  }
}
