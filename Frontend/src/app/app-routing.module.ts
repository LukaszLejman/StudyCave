import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlashcardsComponent } from './flashcards/flashcards.component';
import { FlashcardsSetsListComponent } from './flashcards-sets-list/flashcards-sets-list.component';
import { FlashcardsAddComponent } from './flashcards-add/flashcards-add.component';
import { FlashcardsAddCsvComponent } from './flashcards-add-csv/flashcards-add-csv.component';
import { FlashcardsAddTableComponent } from './flashcards-add-table/flashcards-add-table.component';
import { FlashcardsSetDetailComponent } from './flashcards-set-detail/flashcards-set-detail.component';
import { FlashcardsPairsTestComponent } from './flashcards-pairs-test/flashcards-pairs-test.component';
import { FlashcardsMemoryTestComponent } from './flashcards-memory-test/flashcards-memory-test.component';
import { FlashcardsEditTableComponent } from './flashcards-edit-table/flashcards-edit-table.component';
import { FlashcardsFillingInTestComponent } from './flashcards-filling-in-test/flashcards-filling-in-test.component';
import { FlashcardsTyperaceTestComponent } from './flashcards-typerace-test/flashcards-typerace-test.component';
import { HomePageComponent } from './home-page/home-page.component';


const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'flashcards', component: FlashcardsComponent },
  { path: 'flashcards/sets', component: FlashcardsSetsListComponent },
  { path: 'flashcards/add', component: FlashcardsAddComponent },
  { path: 'flashcards/add/table', component: FlashcardsAddTableComponent },
  { path: 'flashcards/add/csv', component: FlashcardsAddCsvComponent },
  { path: 'flashcards/sets/:id', component: FlashcardsSetDetailComponent },
  { path: 'flashcards/test-gen/flashcards-pairs/:id', component: FlashcardsPairsTestComponent },
  { path: 'flashcards/test-gen/flashcards-memory/:id', component: FlashcardsMemoryTestComponent },
  { path: 'flashcards/test-gen/flashcards-typerace/:id', component: FlashcardsTyperaceTestComponent },
  { path: 'flashcards/test-gen/flashcards-filling-in/:id', component: FlashcardsFillingInTestComponent },
  { path: 'flashcards/sets/edit/:id', component: FlashcardsEditTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
