import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { Subscription } from 'rxjs/Subscription';
import * as $ from 'jquery';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-flashcards-pairs-test-set',
  templateUrl: './flashcards-pairs-test-set.component.html',
  styleUrls: ['./flashcards-pairs-test-set.component.css']
})
export class FlashcardsPairsTestSetComponent implements OnInit, OnChanges, OnDestroy {

  @Input() package: Array<any>;
  @Input() id: number;
  @Input() package_id: number;

  @Output() goodEvent = new EventEmitter();
  @Output() isChecked = new EventEmitter();

  private verifyAnswerSubscription: ISubscription;
  private leftSides = [];
  private rightSides = [];
  private leftSidesToSend = [];
  private result = [];
  private verify = false;
  private good = 0;
  private selectedLeftSide = { indexOfLeftSide: Number, left_side: String, from: '', id: Number };

  constructor(private flashcardsService: FlashcardsService) { }

  ngOnInit() {
    this.isChecked.emit(false);
    this.prepareLists();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.prepareLists();
  }

  ngOnDestroy() {
  }

  nextQuestion(f) {
    let canSend = true;
    this.good = 0;
    this.result = [];
    this.leftSides.forEach(element => {
      if (element !== '') {
        canSend = false;
      }
    });
    if (canSend) {
      this.verify = true;
      this.leftSidesToSend.forEach((element, index) => {
        const body = {
          content: this.rightSides[index].right_side,
          id: element.id,
          side: 'left'
        };
        this.verifyAnswerSubscription = this.flashcardsService.testCheck(this.id, body).subscribe(d => {
          this.result[index] = d.result;
          if (d.result) {
            this.good += 1;
          }
          if (this.result.length === this.leftSidesToSend.length) {
            this.send();
          }
        });
      });
    }
  }

  send(){
    this.isChecked.emit(true);
    this.goodEvent.emit(this.good);
  }

  leftSideClick(item, i) {
    if (item !== '' && item !== undefined) {
      if (this.selectedLeftSide.from === 'leftSides') {
        this.selectedLeftSide = { indexOfLeftSide: undefined, left_side: undefined, from: undefined, id: undefined };
      } else {
        this.selectedLeftSide = { indexOfLeftSide: i, left_side: item.left_side, from: 'leftSides', id: item.id };
      }
    }
  }

  leftSideToSendClick(item, i) {
    if (this.selectedLeftSide.from === 'leftSides') {
      const helper = this.leftSidesToSend[i];
      this.leftSidesToSend[i] = this.selectedLeftSide;
      this.leftSides[Number(this.selectedLeftSide.indexOfLeftSide)] = helper;
      this.selectedLeftSide = { indexOfLeftSide: undefined, left_side: undefined, from: undefined, id: undefined };
    } else if (this.selectedLeftSide.from === 'leftSidesToSend') {
      const helper = this.leftSidesToSend[i];
      this.leftSidesToSend[i] = this.selectedLeftSide;
      this.leftSidesToSend[Number(this.selectedLeftSide.indexOfLeftSide)] = helper;
      this.selectedLeftSide = { indexOfLeftSide: undefined, left_side: undefined, from: undefined, id: undefined };
    } else if (item !== '' && item !== undefined) {
      this.selectedLeftSide = { indexOfLeftSide: i, left_side: item.left_side, from: 'leftSidesToSend', id: item.id };
    }
  }

  prepareLists() {
    this.selectedLeftSide = { indexOfLeftSide: undefined, left_side: undefined, from: undefined, id: undefined };
    this.leftSides = [];
    this.rightSides = [];
    this.leftSidesToSend = [];
    this.verify = false;
    this.leftSides = JSON.parse(JSON.stringify(this.package[0].setLeft));
    this.rightSides = JSON.parse(JSON.stringify(this.package[0].setRight));
    this.leftSides.forEach(element => {
      this.leftSidesToSend.push('');
    });
  }

}
