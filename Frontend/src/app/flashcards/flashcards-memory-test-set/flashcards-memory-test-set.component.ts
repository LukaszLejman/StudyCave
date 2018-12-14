import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-flashcards-memory-test-set',
  templateUrl: './flashcards-memory-test-set.component.html',
  styleUrls: ['./flashcards-memory-test-set.component.css']
})
export class FlashcardsMemoryTestSetComponent implements OnInit, OnChanges, OnDestroy {

  @Input() package: Array<any>;
  @Input() id: number;
  @Input() package_id: number;

  @Output() goodEvent = new EventEmitter();
  @Output() isChecked = new EventEmitter();

  private flashcardSubscribtion: Array<Subscription> = [];
  private answer: Array<Object> = [];
  private set: Array<Object> = [];
  private visible: Array<Boolean> = [];
  private toCheck: Array<number> = [];
  private isBad: Boolean = false;
  private isOK: Boolean = false;
  private good = 0;
  private clicks = 0;

  constructor(private uploadService: FlashcardsService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.isChecked.emit(false);
    this.flashcardSubscribtion = [];
    this.visible = [];
    this.set = this.package[this.package_id]['set'];
    for (let i = 0; i < this.set.length; i++) {
      this.visible.push(false);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnDestroy();
    const package_idChanges = changes['package_id'];
    if (package_idChanges) {
      this.ngOnInit();
    }
  }

  check(event) {
    if (this.clicks <= 2) {
      this.clicks += 1;
      this.toCheck.push(event.target.id);
      this.visible[this.toCheck[0]] = true;
      if (this.clicks === 2) {
        this.visible[this.toCheck[1]] = true;
        const toSend = {
          x: this.set[this.toCheck[0]],
          y: this.set[this.toCheck[1]],
        };
        setTimeout(() => {
          this.flashcardSubscribtion[this.flashcardSubscribtion.length] =
            this.uploadService.testMemory(this.id, toSend).subscribe(data => {
              this.showWrong(data);
              this.clicks = 0;
            },
              error => {
                this.snackBar.open('Coś poszło nie tak :( Spróbuj ponownie później.', null,
                  { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
                this.clicks = 0;
              }
            );
        }, 1000);
      }
    }
  }

  showWrong(answer: Boolean) {
    this.isGood(answer);
    this.goodEvent.emit(this.good);
  }

  isGood(answer: Boolean) {
    if (!answer) {
      this.isBad = true;
      this.visible[this.toCheck[0]] = false;
      this.visible[this.toCheck[1]] = false;
      setTimeout(() => {
        this.isBad = false;
      }, 1000);
    } else {
      this.isOK = true;
      this.visible[this.toCheck[0]] = true;
      this.visible[this.toCheck[1]] = true;
      document.getElementById(this.toCheck[0].toString()).style.color = 'rgb(94, 249, 37)';
      document.getElementById(this.toCheck[1].toString()).style.color = 'rgb(94, 249, 37)';
      setTimeout(() => {
        this.isOK = false;
      }, 1000);
      this.good += 1;
      let i = 0;
      while (this.visible[i]) {
        if (i === (this.visible.length - 1)) {
          this.isChecked.emit(true);
        }
        i++;
        if (i === this.visible.length) {
          break;
        }
      }
    }
    this.toCheck = [];
  }

  ngOnDestroy() {
    for (let i = 0; i < this.flashcardSubscribtion.length; i++) {
      this.flashcardSubscribtion[i].unsubscribe();
    }
  }

}
