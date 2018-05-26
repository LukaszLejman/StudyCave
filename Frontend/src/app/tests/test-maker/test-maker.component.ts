import { Component, OnInit } from '@angular/core';
import { TestsService } from '../tests.service';

@Component({
  selector: 'app-test-maker',
  templateUrl: './test-maker.component.html',
  styleUrls: ['./test-maker.component.css']
})
export class TestMakerComponent implements OnInit {

  private owner: Number = 0;
  private title: String = '';

  private test: Array<Object> = [];
  private shown: Boolean = false;

  private trueFalse: Boolean = false;
  private singleChoice: Boolean = false;
  private multipleChoice: Boolean = false;
  private puzzle: Boolean = false;
  private gaps: Boolean = false;
  private pairs: Boolean = false;

  private componentVisible: Boolean = false;
  private nr: Number = 0;
  private pointsAll: Number = 0;

  constructor(private testsService: TestsService) {}

  ngOnInit() {}

  // edycja - onLoad() - na odp. serwera -> dla każdego pytania twórz shortcut i dodaj wszystko do zmiennej test. Tytuł testu w zm. title

  onAdd(question: Object): void {
    this.pointsAll = 0;
    this.shown = false;
    this.trueFalse = false;
    this.singleChoice = false;
    this.multipleChoice = false;
    this.puzzle = false;
    this.gaps = false;
    this.pairs = false;
    this.componentVisible = false;
    if (Object.keys(question).length !== 0) {
      let short = question['content']['question'];
      if (short.length > 15) {
        short = short.substr(0, 14) + '...';
      }
      question['shortcut'] = short;

      if (question['edit'] === true) {
        this.test[question['nr'] - 1] = question;
      } else {
        question['nr'] = this.test.length + 1;
        this.test.push(question);
      }
    }
    this.countPoints();
  }

  countPoints(): void {
    this.pointsAll = 0;
    for (let i = 0; i < this.test.length; i++) {
      this.pointsAll += this.test[i]['content']['points'];
    }
  }

  show(type: String): void {
    this.shown = true;
    this.showComponents(type, 0);
  }

  showComponents(type: String, nr: Number): void {
    if (nr > 0) {
      this.componentVisible = true;
    }
    this.trueFalse = false;
    this.singleChoice = false;
    this.multipleChoice = false;
    this.puzzle = false;
    this.gaps = false;
    this.pairs = false;
    this.nr = nr;

    if (type === 'true-false') {
      this.trueFalse = true;
    }
    if (type === 'single-choice') {
      this.singleChoice = true;
    }
    if (type === 'multiple-choice') {
      this.multipleChoice = true;
    }
    if (type === 'puzzle') {
      this.puzzle = true;
    }
    if (type === 'gaps') {
      this.gaps = true;
    }
    if (type === 'pairs') {
      this.pairs = true;
    }
  }

  setIndexes(): void {
    this.countPoints();
    const n = this.test.length;
    for (let i = 0; i < n; i++) {
      this.test[i]['nr'] = i + 1;
    }
  }

  delete(nr: number) {
    this.test.splice((nr - 1), 1);
    this.setIndexes();
  }

  moveUp(nr: number): void {
    const temp = this.test[nr - 2];
    this.test[nr - 2] = this.test[nr - 1];
    this.test[nr - 1] = temp;
    this.setIndexes();
  }

  moveDown(nr: number): void {
    const temp = this.test[nr];
    this.test[nr] = this.test[nr - 1];
    this.test[nr - 1] = temp;
    this.setIndexes();
  }

  save(): void {
    if ((this.title === undefined) || (this.title.trim().length === 0)) {
      alert('Podaj tytuł testu.');
    } else {
      const own = JSON.parse(localStorage.getItem('currentUser'));
      let owner = '0';
      if (own !== null) {
        owner = own['username'];
      }
      const toSend = {
        title: this.title,
        owner: owner
      };
      const body = [];
      const n = this.test.length;
      for (let i = 0; i < n; i++) {
        body.push({
          nr: this.test[i]['nr'],
          type: this.test[i]['content']['type'],
          question: this.test[i]['content']['question'],
          answers: this.test[i]['content']['answers'],
          points: this.test[i]['content']['points']
        });
      }
      toSend['body'] = body;
      console.log(toSend);
      // this.testsService.add(toSend);
    }
  }

}
