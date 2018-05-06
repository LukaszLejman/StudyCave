import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-flashcards-typerace-test',
  templateUrl: './flashcards-typerace-test.component.html',
  styleUrls: ['./flashcards-typerace-test.component.css']
})
export class FlashcardsTyperaceTestComponent implements OnInit, OnDestroy {

  private id: number;
  private flashcardSubscribtionMeta: Subscription;
  private flashcardSubscribtion: Subscription;
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
  private stoptimes = [];

  hour= 0;
  minute= 0;
  second= 0;
  millisecond= 0;
  starttime= false;
  pause= false;
  x= 10;
  intervalId;

  finalhour= 0;
  finalminute= 0;
  finalsecond= 0;
  finalmillisecond= 0;

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
    this.onStart();
  }
  finished() {
    this.finish = true;
    this.onPause();
  }
  verifyAnswer() {
    this.reset();
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
    if (this.answer === this.flashcards[this.index]['content']) {
        this.good = this.good + 1;
    } else {
        this.bad = this.bad + 1;
    }

    if (this.index < this.length_test) {
      this.index = this.index + 1;
      this.filled = this.filled + 1;
      this.answer = '';
    }
    if (this.index === this.length_test) {
      this.not_last = false;
    }
  }
  reset() {
    this.finalhour = this.finalhour + this.hour;
    this.finalminute = this.finalminute + this.minute;
    this.finalsecond = this.finalsecond + this.second;
    this.finalmillisecond = this.finalmillisecond + this.millisecond;
    this.stoptimes.push({
      id: this.index,
      m: this.minute,
      s: this.second,
      ms: this.millisecond,
    });

    this.x = 0;
    this.hour = this.minute = this.second = this.millisecond = 0;
    this.starttime = false;
    this.pause = false;
    clearInterval(this.intervalId);
    this.onStart();
}

onStart() {
   this.x = 10;
   this.starttime = true;
   this.intervalId = setInterval(() => {
     this.updateTime();
   }, 100);
}

onPause() {
  this.pause = true;
  clearInterval(this.intervalId);
}

updateTime() {
  this.millisecond += this.x;

  if (this.millisecond > 90) {
      this.millisecond = 0;
      this.second++;
  }

  if (this.second > 59) {
      this.second = 0;
      this.minute++;
  }

  if (this.minute > 59) {
      this.minute = 0;
      this.hour++;
  }
}

  ngOnDestroy() {
    this.flashcardSubscribtionMeta.unsubscribe();
    this.flashcardSubscribtion.unsubscribe();
  }
}
