import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flashcards-memory-test',
  templateUrl: './flashcards-memory-test.component.html',
  styleUrls: ['./flashcards-memory-test.component.css']
})
export class FlashcardsMemoryTestComponent implements OnInit, OnDestroy {

  private id: number;
  private flashcardSubscribtionMeta: Subscription;
  private flashcardSubscribtion: Subscription;
  private name: String;
  private category: String;
  private length_test: number;
  private flashcards: number;
  private length_packages: number;
  private goodNow: number;
  private started: Boolean = false;
  private finish: Boolean = false;
  private checked: Boolean = false;
  private not_last: Boolean = true;
  private packages: Array<Object> = [];
  private filled = 0;
  private good = 0;
  private package_id = 0;

  constructor(private flashcardsService: FlashcardsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.flashcardSubscribtionMeta = this.flashcardsService.getSet(this.id).subscribe(data => {
      this.name = data['name'];
      this.category = data['category'];
    });
    this.flashcardSubscribtion = this.flashcardsService.getTestMemory(this.id).subscribe(data => {
      this.length_test = data.length;
      this.flashcards = data.length / 2;
      this.createPackages(data);
    });
  }

  createPackages(data) {
    let attribute = '0';
    let set = [];
    const n = this.length_test;
    for (let i = 0; i < n; i++) {
      if (i % 10 === 0) {
        this.packages[attribute] = {
          set: set,
        };
        attribute = (i / 10).toString();
        set = [];
      }
      set.push(data[i]);
      if (i === (n - 1)) {
        this.packages[attribute] = {
          set: set,
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
    this.filled = this.goodNow;
    this.good = this.goodNow;
  }

  isChecked(check) {
    this.checked = check;
  }

  ngOnDestroy() {
    this.flashcardSubscribtionMeta.unsubscribe();
    this.flashcardSubscribtion.unsubscribe();
  }

}
