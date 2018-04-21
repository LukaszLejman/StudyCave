import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flashcards-edit-table',
  templateUrl: './flashcards-edit-table.component.html',
  styleUrls: ['./flashcards-edit-table.component.css']
})
export class FlashcardsEditTableComponent implements OnInit, OnDestroy  {

  private ident: number;

  private table: Boolean = false;
  private tableToSend: any = {};
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  private set: Object = {};
  private flashcardSubscribtion: Subscription;

  constructor(private flashcardsService: FlashcardsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.ident = this.route.snapshot.params.id;
    this.flashcardSubscribtion = this.flashcardsService.getSet(this.ident).subscribe(data => {
      this.set = data;
      const flashcards = data['flashcards'];
      for (let i = 0; i < flashcards.length; i++) {
        this.fieldArray.push({
          left_side: flashcards[i]['left_side'],
          right_side: flashcards[i]['right_side']
        });
      }
    });
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

  addTable(value: any) {
    if (this.fieldArray.length === 0) {
      alert('Zestaw fiszek nie może być pusty!');
    } else {
      this.tableToSend = {
        id: this.ident,
        name: value.title,
        category: value.category,
        owner: 0,
        flashcards: this.fieldArray
      };
      this.flashcardsService.edit(this.tableToSend);
    }
  }

  ngOnDestroy() {
    this.flashcardSubscribtion.unsubscribe();
  }

}
