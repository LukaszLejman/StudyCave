import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit {
  currentUser;
  private isLogin: Boolean;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    authenticationService.getLoggedInName.subscribe(name => this.isLoggedIn());
  }

  navToProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.router.navigate(['/profile', currentUser.username]);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/home']);
    this.isLogin = false;
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser') === null) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.isLoggedIn();
  }

}
