import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { TestMakerComponent } from './test-maker/test-maker.component';
import { TrueFalseQuestionComponent } from './true-false-question/true-false-question.component';
import { SingleChoiceQuestionComponent } from './single-choice-question/single-choice-question.component';
import { MultipleChoiceQuestionComponent } from './multiple-choice-question/multiple-choice-question.component';
import { TestsService } from './tests.service';
import { PuzzleQuestionComponent } from './puzzle-question/puzzle-question.component';
import { GapsQuestionComponent } from './gaps-question/gaps-question.component';
import { PairsQuestionComponent } from './pairs-question/pairs-question.component';
import { TestsListComponent } from './tests-list/tests-list.component';
import { TestEditComponent } from './test-edit/test-edit.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  declarations: [
    TestMakerComponent,
    TrueFalseQuestionComponent,
    SingleChoiceQuestionComponent,
    MultipleChoiceQuestionComponent,
    PuzzleQuestionComponent,
    GapsQuestionComponent,
    PairsQuestionComponent,
    TestsListComponent,
    TestEditComponent
  ],
  providers: [TestsService],
})
export class TestsModule { }
