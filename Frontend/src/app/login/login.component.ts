import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {BackEndService} from '../backend-service';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login-app',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  jwtHelper: JwtHelper = new JwtHelper();
  accessToken: string;
  user: User;
  constructor(private http: Http, private router: Router, private backEndService: BackEndService) {
  }
  ngOnInit() {
    localStorage.removeItem('currentUser');
    this.user = new User('', '');

  } onSubmit() {
    this.backEndService.authenticate(this.user);
  }
}
