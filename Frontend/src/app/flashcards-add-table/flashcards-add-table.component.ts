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
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  addTable(value:any) {
    // obsługa formularza dodawania fiszek do tabeli
    if (this.fieldArray.length === 0) {
      alert("Zestaw fiszek nie może być pusty!");
    } else {
      this.tableToSend = {
        name: value.title,
        category: value.category,
        owner: 0,
        flashcards: this.fieldArray
      }
      this.flashcardsService.add(this.tableToSend);
    }
  }
}