import { Component, OnInit } from '@angular/core';
import { TestsService } from '../tests.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-test-maker',
  templateUrl: './test-maker.component.html',
  styleUrls: ['./test-maker.component.css']
})
export class TestMakerComponent implements OnInit {

   owner: Number = 0;
   title: String = '';
   permission: Boolean = false;

   test: Array<Object> = [];
   shown: Boolean = false;

   trueFalse: Boolean = false;
   singleChoice: Boolean = false;
   multipleChoice: Boolean = false;
   puzzle: Boolean = false;
   gaps: Boolean = false;
   pairs: Boolean = false;

   componentVisible: Boolean = false;
   nr: Number = 0;
   pointsAll: Number = 0;

  constructor(private testsService: TestsService, public snackBar: MatSnackBar) { }

  ngOnInit() { }

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

  changePermission(): void {
    this.permission = !this.permission;
  }

  save(): void {
    if ((this.title === undefined) || (this.title.trim().length === 0)) {
      this.snackBar.open('Podaj tytuł testu.', null,
        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
    } else {
      let p = 'private';
      if (this.permission) {
        p = 'public';
      }
      const own = JSON.parse(localStorage.getItem('currentUser'));
      let owner = '0';
      if (own !== null) {
        owner = own['username'];
      }
      const toSend = {
        title: this.title,
        owner: owner,
        permission: p
      };
      const body = [];
      const n = this.test.length;
      for (let i = 0; i < n; i++) {
        body.push({
          nr: this.test[i]['nr'],
          type: this.test[i]['content']['type'],
          question: this.test[i]['content']['question'],
          answers: this.test[i]['content']['answers'],
          points: this.test[i]['content']['points'],
          id: this.test[i]['content']['id']
        });
      }
      toSend['body'] = body;
      // console.log(toSend);
      this.testsService.add(toSend);
    }
  }

}
