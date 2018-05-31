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
  private currentUser;
  private permission: Boolean = false;

  constructor(private flashcardsService: FlashcardsService) { }

  ngOnInit() { this.isLoggedIn(); }

  changePermission(): void {
    this.permission = !this.permission;
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser') === null) {
      this.currentUser = 'Anonim';
    } else {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

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

  setOwner(): string {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).username;
    } else {
      return 'anonim';
    }
  }

  addTable(value: any) {
    // obsługa formularza dodawania fiszek do tabeli
    if (this.fieldArray.length === 0) {
      alert('Zestaw fiszek nie może być pusty!');
    } else {
      let p = 'Private';
      if (this.permission) {
        p = 'Public';
      }
      this.tableToSend = {
        name: value.title,
        category: value.category,
        owner: this.setOwner(),
        flashcards: this.fieldArray,
        permission: p
      };
      this.flashcardsService.add(this.tableToSend);
    }
  }
}
