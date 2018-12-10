import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { FlashcardsComponent } from './flashcards/flashcards.component';
import { FlashcardsSetsListComponent } from './flashcards-sets-list/flashcards-sets-list.component';
import { FlashcardsService } from './flashcards.service';
import { FlashcardsAddComponent } from './flashcards-add/flashcards-add.component';
import { FlashcardsAddTableComponent } from './flashcards-add-table/flashcards-add-table.component';
import { FlashcardsAddCsvComponent } from './flashcards-add-csv/flashcards-add-csv.component';
import { FlashcardsSetDetailComponent } from './flashcards-set-detail/flashcards-set-detail.component';
import { FlashcardsEditTableComponent } from './flashcards-edit-table/flashcards-edit-table.component';
import { FlashcardsPairsTestComponent } from './flashcards-pairs-test/flashcards-pairs-test.component';
import { FlashcardsPairsTestSetComponent } from './flashcards-pairs-test-set/flashcards-pairs-test-set.component';
import { FlashcardsTestTypeMenuComponent } from './flashcards-test-type-menu/flashcards-test-type-menu.component';
import { FlashcardsFillingInTestComponent } from './flashcards-filling-in-test/flashcards-filling-in-test.component';
import { FlashcardsMemoryTestComponent } from './flashcards-memory-test/flashcards-memory-test.component';
import { FlashcardsMemoryTestSetComponent } from './flashcards-memory-test-set/flashcards-memory-test-set.component';
import { FlashcardsTyperaceTestComponent } from './flashcards-typerace-test/flashcards-typerace-test.component';
import { RouterModule } from '@angular/router';
import { TestResultsComponent } from './test-results/test-results.component';
import { FilterUserPipe } from '../filter-user.pipe';
import { FilterPipe } from '../filter.pipe';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    SharedModule

  ],
  declarations: [
    TestResultsComponent,
    FlashcardsComponent,
    FlashcardsSetsListComponent,
    FlashcardsAddComponent,
    FlashcardsAddTableComponent,
    FlashcardsAddCsvComponent,
    FlashcardsSetDetailComponent,
    FlashcardsEditTableComponent,
    FlashcardsPairsTestComponent,
    FlashcardsPairsTestSetComponent,
    FlashcardsTestTypeMenuComponent,
    FlashcardsFillingInTestComponent,
    FlashcardsMemoryTestComponent,
    FlashcardsMemoryTestSetComponent,
    FlashcardsTyperaceTestComponent,
    FilterUserPipe,
    FilterPipe
  ],
  providers: [FlashcardsService, FilterPipe, FilterUserPipe],
})
export class FlashcardsModule { }
