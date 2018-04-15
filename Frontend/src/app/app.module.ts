import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { FlashcardsComponent } from './flashcards/flashcards.component';
import { AppRoutingModule } from './/app-routing.module';
import { FlashcardsSetsListComponent } from './flashcards-sets-list/flashcards-sets-list.component';
import { FlashcardsService } from './flashcards.service';
import { FlashcardsAddComponent } from './flashcards-add/flashcards-add.component';
import { FlashcardsAddTableComponent } from './flashcards-add-table/flashcards-add-table.component';
import { FlashcardsAddCsvComponent } from './flashcards-add-csv/flashcards-add-csv.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavigationComponent,
    FlashcardsComponent,
    FlashcardsSetsListComponent,
    FlashcardsAddComponent,
    FlashcardsAddTableComponent,
    FlashcardsAddCsvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [FlashcardsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
