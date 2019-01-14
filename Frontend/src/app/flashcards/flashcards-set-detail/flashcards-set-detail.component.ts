import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Set } from '../set';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardsService } from '../flashcards.service';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoutingStateService } from '../../routing-state.service';

@Component({
  selector: 'app-flashcards-set-detail',
  templateUrl: './flashcards-set-detail.component.html',
  styleUrls: ['./flashcards-set-detail.component.css']
})
export class FlashcardsSetDetailComponent implements OnInit, OnDestroy {
  id: number;
  set: any;
  flashcardSubscribtion: Subscription;
  testTypeMenu = false;
  user: Boolean = false;
  ShowStatus: Boolean = false;
  permission: string;
  owner;
  owned: Boolean = false;
  display = false;

  constructor(private route: ActivatedRoute, private flashcardsService: FlashcardsService, private router: Router,
    private routingState: RoutingStateService, public snackBar: MatSnackBar) { }
  ngOnInit() {
    const previousUrl = this.routingState.getPreviousUrl();
    if (previousUrl.indexOf('test-gen') === -1) {
      sessionStorage.setItem('previousUrl', previousUrl);
    }
    this.id = this.route.snapshot.params.id;
    this.flashcardSubscribtion = this.flashcardsService.getSet(this.id).subscribe(data => { this.set = data; });
    this.IsLogin();
    this.owner = this.flashcardsService.getOwner();
    this.isOwner();
  }

  isOwner() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (localStorage.getItem('currentUser')) {
      if (currentUser.username === this.owner) {
        this.owned = true;
      }
    } else {
      this.owned = false;
    }
  }

  showTestTypeMenu() {
    this.testTypeMenu = true;
  }

  IsLogin() {
    if (localStorage.getItem('currentUser')) {
      this.user = true;
    } else {
      this.user = false;
    }
  }

  showPopup() {
    this.display = true;
  }

  changePermission(): void {
    if (this.set.permission === 'Public') {
      this.permission = 'Private';
    } else {
      this.permission = 'Public';
    }
    this.flashcardsService.changeSetPermission(this.id, this.permission);
    this.snackBar.open('Zmieniono pozwolenie na: ' + this.permission, null,
      { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
  }

  handleCancelFlashcardsTestyTypeMenu(e) {
    this.testTypeMenu = e;
  }

  navigateToEditMode() {
    this.router.navigate(['flashcards/sets/edit', this.id]);
  }

  ngOnDestroy() {
    this.flashcardSubscribtion.unsubscribe();
  }

  deleteSet() {
    const data = this.id;
    this.flashcardSubscribtion = this.flashcardsService.deleteSet(data);
    this.display = false;
  }

  goBack() {
    const previousUrl = sessionStorage.getItem('previousUrl');
    sessionStorage.removeItem('previousUrl');
    this.router.navigate([previousUrl]);
  }

}
