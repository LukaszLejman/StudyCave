import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Base64 } from 'js-base64';
import { User } from './user';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BackEndService {

  constructor(private http: Http, private router: Router) { }

  url: string;
  headers: Headers;
  options: RequestOptions;
  creds: String;
  updatedUser: string;

  authenticate(user: User) {
    this.url = 'http://localhost:8080/auth/oauth/token';
    this.headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Base64.encode(user.username + ':' + user.password)
    });
    this.options = new RequestOptions({ headers: this.headers });
    this.creds = 'grant_type=client_credentials';
    this.http.post(this.url, this.creds, this.options)
      .map(res => res.json()).subscribe(response => {
        localStorage.setItem('currentUser', JSON.stringify({userName: user.username, token: response.access_token }));
        this.router.navigateByUrl('/home');
      }, (error) => {
        console.log('error in', error);
      });
  }
  getUpdatedUser(user: User): Observable<User> {

    this.url = 'http://localhost:9090/getUpdatedUser';
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token
    });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.post(this.url, user, this.options)
      .map(res => res.json());

  }
}
