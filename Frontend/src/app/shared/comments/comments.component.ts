import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy {

  id: number;
  currentUser= '';
  comment: string;
  comments = [];
  display = false;
  @Input()
  who: string;
  @Input()
  what: string;

  commentsSubscription: Subscription;

  mockComments = [
    // tslint:disable-next-line:max-line-length
    {owner: 'testOwner', comment: 'Lorem ipsum dolor więcej nie pamiętam bardzo skomplikowany komentarz omg omg omg co się dzieje ja nie ogarniam ratunku pomocy'},
    {owner: 'testOwner', comment: 'Lorem ipsum dolor więcej nie pamiętam bardzo skomplikowany komentarz omg omg omg co się dzieje ja nie ogarniam ratunku pomocy'},
    // tslint:disable-next-line:max-line-length
    {owner: 'testOwner', comment: 'Lorem ipsum dolor więcej nie pamiętam bardzo skomplikowany komentarz omg omg omg co się dzieje ja nie ogarniam ratunku pomocy'},
    {owner: 'testOwner', comment: 'Lorem ipsum dolor więcej nie pamiętam bardzo skomplikowany komentarz omg omg omg co się dzieje ja nie ogarniam ratunku pomocy'},
    // tslint:disable-next-line:max-line-length
    {owner: 'testOwner', comment: 'Lorem ipsum dolor więcej nie pamiętam bardzo skomplikowany komentarz omg omg omg co się dzieje ja nie ogarniam ratunku pomocy'}
  ];


  constructor(sharedService: SharedService, private route: ActivatedRoute) { }


  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.currentUser = JSON.parse(localStorage.getItem('currentIser'));
    this.comments = this.mockComments;
  //  this.commentsSubscription = this.sharedService.getComments(this.id, this.what).subscribe(data => this.comments = data);
  }

  toggle() {
    this.display = !this.display;
  }

  submitComment() {
    const dataToSend = {
      user: this.who,
      resource: this.what,
      comment: this.comment
    };
    // this.sharedService.sendComment(this.id, this.what, dataToSend);
  }


  ngOnDestroy() {
    if (this.commentsSubscription) {
      this.commentsSubscription.unsubscribe();
    }
  }

}
