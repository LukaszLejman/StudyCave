import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit {

  constructor(private router: Router) { }

  navToProfile() {
    console.log(11111);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.router.navigate(['/profile', currentUser.username]);
  }

  ngOnInit() {
  }

}
