import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlashcardsComponent } from './flashcards/flashcards.component';
import { FlashcardsSetsListComponent } from './flashcards-sets-list/flashcards-sets-list.component';
import { FlashcardsAddComponent } from './flashcards-add/flashcards-add.component';
import { FlashcardsAddCsvComponent } from './flashcards-add-csv/flashcards-add-csv.component';
import { FlashcardsAddTableComponent } from './flashcards-add-table/flashcards-add-table.component';
import { FlashcardsSetDetailComponent } from './flashcards-set-detail/flashcards-set-detail.component';

const routes: Routes = [
  { path: 'flashcards', component: FlashcardsComponent },
  { path: 'flashcards/sets', component: FlashcardsSetsListComponent },
  { path: 'flashcards/add', component: FlashcardsAddComponent},
  { path: 'flashcards/add/table', component: FlashcardsAddTableComponent},
  { path: 'flashcards/add/csv', component: FlashcardsAddCsvComponent},
  { path: 'flashcards/sets/:id', component: FlashcardsSetDetailComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
