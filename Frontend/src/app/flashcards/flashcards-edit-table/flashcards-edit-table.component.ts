import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-flashcards-edit-table',
  templateUrl: './flashcards-edit-table.component.html',
  styleUrls: ['./flashcards-edit-table.component.css']
})
export class FlashcardsEditTableComponent implements OnInit, OnDestroy {

  private ident: number;
  private permission: Boolean = false;
  private table: Boolean = false;
  private tableToSend: any = {};
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  private set: Object = {};
  private flashcardSubscribtion: Subscription;

  constructor(private flashcardsService: FlashcardsService, private route: ActivatedRoute, private router: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.ident = this.route.snapshot.params.id;
    this.flashcardSubscribtion = this.flashcardsService.getSet(this.ident).subscribe(data => {
      this.set = data;
      if (data['permission'] === 'Private') {
        this.permission = false;
      } else {
        this.permission = true;
      }
      const flashcards = data['flashcards'];
      for (let i = 0; i < flashcards.length; i++) {
        const id = flashcards[i]['id'];
        this.fieldArray.push({
          id: id,
          left_side: flashcards[i]['left_side'],
          right_side: flashcards[i]['right_side']
        });
      }
    });
  }
  returnToSet() {
    this.router.navigate(['/flashcards/sets/', this.ident]);
  }
  addFieldValue() {
    const undefinedAttr = ((this.newAttribute['left_side'] === undefined) || (this.newAttribute['right_side'] === undefined));
    if (undefinedAttr) {
      this.snackBar.open('Nie można dodać fiszki z pustym polem!', null,
        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
    } else {
      const length = ((this.newAttribute['left_side'].trim().length === 0) || (this.newAttribute['right_side'].trim().length === 0));
      if (length) {
        this.snackBar.open('Nie można dodać fiszki z pustym polem!', null,
          { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
      } else {
        const insert = {
          id: null,
          left_side: this.newAttribute['left_side'],
          right_side: this.newAttribute['right_side'],
        };
        this.fieldArray.push(insert);
        this.newAttribute = {};
      }
    }
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  addTable(value: any) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.fieldArray.length === 0) {
      this.snackBar.open('Zestaw fiszek nie może być pusty!', null,
        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
    } else {
      let perm = 'Private';
      if (this.permission) {
        perm = 'Public';
      }
      this.tableToSend = {
        id: this.ident,
        name: value.title,
        permission: perm,
        category: value.category,
        owner: currentUser.username,
        flashcards: this.fieldArray
      };
      this.flashcardsService.edit(this.tableToSend);
    }
  }

  changePermission(): void {
    this.permission = !this.permission;
  }

  ngOnDestroy() {
    this.flashcardSubscribtion.unsubscribe();
  }

}
