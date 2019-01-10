import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy {

  id: number;
  currentUser;
  comment: string;
  comments = [];
  display = false;
  @Input()
  what: string;

  commentsSubscription: Subscription;
  deleteCommentSubscription: Subscription;

  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    public snackBar: MatSnackBar) { }


  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getComments();
    console.log(this.comments);
  }

  getComments() {
    this.commentsSubscription = this.sharedService.getComments(this.id, this.what).subscribe(data => {
      this.comments = data;
      this.cd.markForCheck();
    });
  }

  toggle() {
    this.display = !this.display;
  }

  submitComment() {
    if (this.comment) {
      const dataToSend = {
        username: this.currentUser.username,
        text: this.comment
      };
      this.sharedService.sendComment(this.id, this.what, dataToSend);
      setTimeout(() => this.getComments(), 200);
    } else {
      this.snackBar.open('Nie można dodać pustego komentarza', null,
        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
    }

  }

  deleteComment(comment) {
  this.sharedService.deleteComment(comment.id);
    setTimeout(() => this.getComments(), 200);
  }


  ngOnDestroy() {
    if (this.commentsSubscription) {
      this.commentsSubscription.unsubscribe();
    }
    if (this.deleteCommentSubscription) {
      this.deleteCommentSubscription.unsubscribe();
    }
  }

}
