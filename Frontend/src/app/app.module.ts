import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { FlashcardsComponent } from './flashcards/flashcards.component';
import { AppRoutingModule } from './/app-routing.module';
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
import { TestResultsComponent } from './test-results/test-results.component';
import { FlashcardsFillingInTestComponent } from './flashcards-filling-in-test/flashcards-filling-in-test.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FlashcardsMemoryTestComponent } from './flashcards-memory-test/flashcards-memory-test.component';
import { FlashcardsMemoryTestSetComponent } from './flashcards-memory-test-set/flashcards-memory-test-set.component';
import { FlashcardsTyperaceTestComponent } from './flashcards-typerace-test/flashcards-typerace-test.component';
import { AutofocusDirective } from './autofocus.directive';
import { FooterComponent } from './footer/footer.component';

import { LoginComponent } from './login/login.component';
import {AuthGuard} from './auth-guard.service';
import {BackEndService} from './backend-service';
import { TestMakerComponent } from './test-maker/test-maker.component';
import { TrueFalseQuestionComponent } from './true-false-question/true-false-question.component';
import { SingleChoiceQuestionComponent } from './single-choice-question/single-choice-question.component';
import { MultipleChoiceQuestionComponent } from './multiple-choice-question/multiple-choice-question.component';
import { TestsService } from './tests.service';



@NgModule({
  declarations: [
    AppComponent,
    MainNavigationComponent,
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
    TestResultsComponent,
    FlashcardsFillingInTestComponent,
    HomePageComponent,
    FlashcardsMemoryTestComponent,
    FlashcardsMemoryTestSetComponent,
    FlashcardsTyperaceTestComponent,
    AutofocusDirective,
    FooterComponent,
    AppComponent,
    LoginComponent,
    TestMakerComponent,
    TrueFalseQuestionComponent,
    SingleChoiceQuestionComponent,
    MultipleChoiceQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [FlashcardsService, AuthGuard, BackEndService, TestsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
