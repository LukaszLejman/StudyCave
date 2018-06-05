import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsService } from '../../../tests.service';
import * as $ from 'jquery';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-pairs',
  templateUrl: './pairs.component.html',
  styleUrls: ['./pairs.component.css']
})
export class PairsComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  private question;
  @Output() emitNextQuestionRequest = new EventEmitter();
  private id;
  private verifyAnswerSubscription: ISubscription;
  private leftSides = [];
  private rightSides = [];
  private leftSidesToSend = [];
  private selectedLeftSide = { indexOfLeftSide: Number, leftSideText: String, from: '' };

  constructor(private route: ActivatedRoute, private testsService: TestsService) { }

  nextQuestion(f) {
    this.id = this.route.snapshot.params.id;
    const answers = [];
    this.leftSidesToSend.forEach((element, index) => {
      answers.push({
        left: element,
        right: this.rightSides[index]
      });
    });
    const body = {
      id: this.question.id, type: 'pairs',
      answers: answers
    };
    //console.log(body);
    this.verifyAnswerSubscription = this.testsService.verifyAnswer(this.id, body).subscribe(d => {
      $('.answers').find('[type="text"]').prop('value', '');
      this.emitNextQuestionRequest.emit(d);
    });
  }

  leftSideClick(item, i) {
    if (item !== '' && item !== undefined) {
      if (this.selectedLeftSide.from === 'leftSides') {
        this.selectedLeftSide = { indexOfLeftSide: undefined, leftSideText: undefined, from: undefined };
      } else {
        this.selectedLeftSide = { indexOfLeftSide: i, leftSideText: item, from: 'leftSides' };
      }
    }
  }

  leftSideToSendClick(item, i) {
    if (this.selectedLeftSide.from === 'leftSides') {
      const helper = this.leftSidesToSend[i];
      this.leftSidesToSend[i] = this.selectedLeftSide.leftSideText;
      this.leftSides[Number(this.selectedLeftSide.indexOfLeftSide)] = helper;
      this.selectedLeftSide = { indexOfLeftSide: undefined, leftSideText: undefined, from: undefined };
    } else if (this.selectedLeftSide.from === 'leftSidesToSend') {
      const helper = this.leftSidesToSend[i];
      this.leftSidesToSend[i] = this.selectedLeftSide.leftSideText;
      this.leftSidesToSend[Number(this.selectedLeftSide.indexOfLeftSide)] = helper;
      this.selectedLeftSide = { indexOfLeftSide: undefined, leftSideText: undefined, from: undefined };
    } else if (item !== '' && item !== undefined) {
      this.selectedLeftSide = { indexOfLeftSide: i, leftSideText: item, from: 'leftSidesToSend' };
    }
  }

  prepareLists() {
    this.selectedLeftSide = { indexOfLeftSide: undefined, leftSideText: undefined, from: undefined };
    this.leftSides = [];
    this.rightSides = [];
    this.leftSidesToSend = [];
    this.leftSides = JSON.parse(JSON.stringify(this.question.answers[0].left));
    this.rightSides = JSON.parse(JSON.stringify(this.question.answers[0].right));
    this.leftSides.forEach(element => {
      this.leftSidesToSend.push('');
    });
  }

  ngOnInit() {
    this.prepareLists();
  }

  ngOnChanges() {
    this.prepareLists();
  }

  ngOnDestroy() {
    if (this.verifyAnswerSubscription) {
      this.verifyAnswerSubscription.unsubscribe();
    }
  }
}
