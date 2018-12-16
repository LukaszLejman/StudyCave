import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

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
import { AgGridModule } from 'ag-grid-angular';
import { TestDetailsComponent } from './test-details/test-details.component';
import { QuestionViewComponent } from './test-details/question-view/question-view.component';
import { TrueFalseComponent } from './test-details/question-view/true-false/true-false.component';
import { SingleChoiceComponent } from './test-details/question-view/single-choice/single-choice.component';
import { MultipleChoiceComponent } from './test-details/question-view/multiple-choice/multiple-choice.component';
import { PuzzleComponent } from './test-details/question-view/puzzle/puzzle.component';
import { GapsComponent } from './test-details/question-view/gaps/gaps.component';
import { PairsComponent } from './test-details/question-view/pairs/pairs.component';
import { SharedModule } from '../shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    AgGridModule.withComponents([]),
    SharedModule,
    DialogModule,
    ConfirmDialogModule
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
    TestEditComponent,
    TestDetailsComponent,
    QuestionViewComponent,
    TrueFalseComponent,
    SingleChoiceComponent,
    MultipleChoiceComponent,
    PuzzleComponent,
    GapsComponent,
    PairsComponent
  ],
  providers: [TestsService],
})
export class TestsModule { }
