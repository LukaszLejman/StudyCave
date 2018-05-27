import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) { }

  private headers;

  setHeaders() {
    if (localStorage.getItem('currentUser')) {
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': '' + this.authenticationService.getToken()
      });
    } else {
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
  }

  register(body) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post('user/register', body, { headers: headers, responseType: 'text' });
  }

  getUserProfile() {
    this.setHeaders();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.httpClient.get('user/' + currentUser.username, { headers: this.headers });
  }

  edit(body) {
    this.setHeaders();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.httpClient.put('user/info/update', body, { headers: this.headers, responseType: 'text' });
  }

}
