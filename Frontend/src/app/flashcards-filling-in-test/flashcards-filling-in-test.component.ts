import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flashcards-filling-in-test',
  templateUrl: './flashcards-filling-in-test.component.html',
  styleUrls: ['./flashcards-filling-in-test.component.css']
})
export class FlashcardsFillingInTestComponent implements OnInit, OnDestroy {

  private id: number;
  private flashcardSubscribtionMeta: Subscription;
  private flashcardSubscribtion: Subscription;
  private flashcardSubscribtionCheck: Subscription;
  private name: String;
  private category: String;
  private length_test: number;
  private goodNow: number;
  private started: Boolean = false;
  private finish: Boolean = false;
  private flashcards: Array<Object> = [];
  private filled = 0;
  private good = 0;
  private bad = 0;
  private answer: String;
  private index = 0;
  private not_last: Boolean = true;
  private is_correct: Boolean;
  private allAnswers = [];


  constructor(private flashcardsService: FlashcardsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.flashcardSubscribtionMeta = this.flashcardsService.getSet(this.id).subscribe(data => {
      this.name = data['name'];
      this.category = data['category'];
    });
    this.flashcardSubscribtion = this.flashcardsService.getTestFilling(this.id).subscribe(data => {
      this.length_test = data.length;
      this.flashcards = data;
    });

  }

  start() {
    this.started = true;
  }
  finished() {
    this.finish = true;
  }
  verifyAnswer() {
    const body = [];
    const n = this.length_test;
    if (this.answer === '') {
      this.answer = ' ';
    }
    this.allAnswers.push({
      id: this.index,
      answer: this.answer,
    });
    body.push({
      id: this.flashcards[this.index]['id'],
      content: this.answer,
      side: this.flashcards[this.index]['side'],
    });
    this.flashcardSubscribtionCheck = this.flashcardsService.testCheck(this.id, body[0])
      .subscribe(data => {
        this.is_correct = data.result;
        if (this.is_correct === true) {
          this.good = this.good + 1;
        } else {
          this.bad = this.bad + 1;
        }
      });
    if (this.index < this.length_test) {
      this.index = this.index + 1;
      this.filled = this.filled + 1;
      this.answer = '';
    }
    if (this.index === this.length_test) {
      this.not_last = false;
    }
  }

  ngOnDestroy() {
    this.flashcardSubscribtionMeta.unsubscribe();
    this.flashcardSubscribtion.unsubscribe();
    this.flashcardSubscribtionCheck.unsubscribe();
  }
}
