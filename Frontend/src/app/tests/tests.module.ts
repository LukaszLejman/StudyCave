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
    MultipleChoiceQuestionComponent
  ],
  providers: [TestsService],
})
export class TestsModule { }
