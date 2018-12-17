import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnChanges, OnDestroy {

  id: number;
  currentUser;
  comment: string;
  comments = [];
  display = false;
  @Input()
  what: string;

  commentsSubscription: Subscription;
  deleteCommentSubscription: Subscription;

  constructor(private sharedService: SharedService, private route: ActivatedRoute) { }


  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.commentsSubscription = this.sharedService.getComments(this.id, this.what).subscribe(data => this.comments = data);
 }

 ngOnChanges(changes: SimpleChanges) {
   if (changes.comments.currentValue !== changes.comments.previousValue) {
    this.comments = changes.comments.currentValue;
   }

 }

  toggle() {
    this.display = !this.display;
  }

  submitComment() {
    const dataToSend = {
      username: this.currentUser.username,
      text: this.comment
    };
    this.sharedService.sendComment(this.id, this.what, dataToSend).subscribe();
    this.commentsSubscription = this.sharedService.getComments(this.id, this.what).subscribe(data => this.comments = data);
  }

  deleteComment(comment) {
    this.deleteCommentSubscription = this.sharedService.deleteComment(comment).subscribe();
    this.commentsSubscription = this.sharedService.getComments(this.id, this.what).subscribe(data => this.comments = data);
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
