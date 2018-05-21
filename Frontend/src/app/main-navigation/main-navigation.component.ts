import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnChanges, OnInit {

  @Input() isLogin: Boolean;
  private _isLogin;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  navToProfile() {
    console.log(11111);
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

  ngOnChanges(changes: SimpleChanges): void {
    const isLoginChanges: SimpleChange = changes['isLogin'];
    if (isLoginChanges) {
      this.router.navigate(['/home']);
      this.isLogin = true;
    }
  }

  ngOnInit(): void {
    this.isLoggedIn();
  }

}
