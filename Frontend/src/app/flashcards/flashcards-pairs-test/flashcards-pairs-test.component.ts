import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flashcards-pairs-test',
  templateUrl: './flashcards-pairs-test.component.html',
  styleUrls: ['./flashcards-pairs-test.component.css']
})
export class FlashcardsPairsTestComponent implements OnInit, OnDestroy {

  private id: number;
  private flashcardSubscribtionMeta: Subscription;
  private flashcardSubscribtion: Subscription;
  private name: String;
  private category: String;
  private length_test: number;
  private length_packages: number;
  private goodNow: number;
  private started: Boolean = false;
  private finish: Boolean = false;
  private left: Boolean = true;
  private right: Boolean = false;
  private checked: Boolean = false;
  private not_last: Boolean = true;
  private packages: Array<Object> = [];
  private filled = 0;
  private good = 0;
  private bad = 0;
  private package_id = 0;

  constructor(private flashcardsService: FlashcardsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.flashcardSubscribtionMeta = this.flashcardsService.getSet(this.id).subscribe(data => {
      this.name = data['name'];
      this.category = data['category'];
    });
    this.flashcardSubscribtion = this.flashcardsService.getTestPairing(this.id).subscribe(data => {
      this.length_test = data['left'].length;
      this.createPackages(data);
    });
  }

  createPackages(data) {
    let attribute = '0';
    let setLeft = [];
    let setRight = [];
    const n = this.length_test;
    for (let i = 0; i < n; i++) {
      if (i % 5 === 0) {
        this.packages[attribute] = {
          setLeft: setLeft,
          setRight: setRight
        };
        attribute = (i / 5).toString();
        setLeft = [];
        setRight = [];
      }
      setLeft.push(data['left'][i]);
      setRight.push(data['right'][i]);
      if (i === (n - 1)) {
        this.packages[attribute] = {
          setLeft: setLeft,
          setRight: setRight
        };
      }
    }
    this.length_packages = this.packages.length;
    if (this.packages.length < 2) {
      this.not_last = false;
    }
  }

  start() {
    this.started = true;
  }

  increment() {
    if (this.package_id === (this.length_packages - 2)) {
      this.not_last = false;
    }
    if (this.package_id === (this.length_packages - 1)) {
      this.started = false;
      this.finish = true;
    } else {
      this.package_id += 1;
    }
  }

  goodEvent(goods) {
    this.goodNow = goods;
    const filledNow = this.packages[this.package_id]['setLeft'].length;
    this.filled = filledNow;
    this.good = this.goodNow;
    this.bad = this.filled - this.good;
  }

  isChecked(check) {
    this.checked = check;
  }

  ngOnDestroy() {
    this.flashcardSubscribtionMeta.unsubscribe();
    this.flashcardSubscribtion.unsubscribe();
  }

}
