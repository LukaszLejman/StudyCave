import { Component, OnInit } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';

@Component({
  selector: 'app-flashcards-add-table',
  templateUrl: './flashcards-add-table.component.html',
  styleUrls: ['./flashcards-add-table.component.css']
})
export class FlashcardsAddTableComponent implements OnInit {

  table = false;
  tableToSend = {};
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  constructor(private flashcardsService: FlashcardsService) { }

  ngOnInit() {
  }

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  addTable(value:any) {
    // obsługa formularza dodawania fiszek do tabeli
    if(this.fieldArray.length === 0) {
      alert("Zestaw fiszek nie może być pusty!");
    } else {
      console.log(this.fieldArray)
      console.log(value.title);
      console.log(value.category);
      this.tableToSend = {
        name: value.title,
        category: value.category,
        owner: "anonymous",
        set: this.fieldArray
      }
      const isOk = this.flashcardsService.add(this.tableToSend);
      if (isOk === false) {
        alert('Coś poszło nie tak. Spróbuj ponownie później.');
      } else {
        alert('Dodano!');
      }
    }
  }
}
