import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestsService } from '../tests.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-edit',
  templateUrl: './test-edit.component.html',
  styleUrls: ['./test-edit.component.css']
})
export class TestEditComponent implements OnInit, OnDestroy {

  private ident: Number;
  private owner: Number = 0;
  private title: String = '';
  private permission: Boolean = false;

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

  private testSubscribtion: Subscription;

  constructor(private testsService: TestsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.ident = this.route.snapshot.params.id;
    this.testSubscribtion = this.testsService.getTest(this.ident).subscribe(
      data => {
        this.title = data['title'];
        this.owner = data['owner'];
        if (data['permission'] === 'public') {
          this.permission = true;
        } else {
          this.permission = false;
        }
        const d = data['body'];
        for (let i = 0; i < d.length; i++) {
          let short = d[i]['question'];
          if (short.length > 15) {
            short = short.substr(0, 14) + '...';
          }
          const obj = {
            nr: d[i]['nr'],
            content: {
              id: d[i]['id'],
              type: d[i]['type'],
              question: d[i]['question'],
              answers: d[i]['answers'],
              points: d[i]['points']
            },
            shortcut: short
          };
          this.test.push(obj);
        }
        this.countPoints();
      },
      error => { alert('Coś poszło nie tak. Spróbuj ponownie później.'); }
    );
  }

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
      alert('Podaj tytuł testu.');
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
        id: this.ident,
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
      console.log(toSend);
      this.testsService.edit(toSend);
    }
  }

  ngOnDestroy() {
    this.testSubscribtion.unsubscribe();
  }

}
