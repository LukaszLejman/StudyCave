import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bagdes',
  templateUrl: './bagdes.component.html',
  styleUrls: ['./bagdes.component.css']
})
export class BagdesComponent implements OnInit, OnDestroy {

  badges;
  badgesSubscription: Subscription;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  this.badgesSubscription = this.userService.getBadges().subscribe(val => {
    this.badges = val;
  });
  }

  goBack() {
    const usr = JSON.parse(localStorage.getItem('currentUser'));
    this.router.navigate(['/profile/', usr.username]);
  }

  ngOnDestroy() {
   if (this.badgesSubscription) {this.badgesSubscription.unsubscribe(); }
  }

}
