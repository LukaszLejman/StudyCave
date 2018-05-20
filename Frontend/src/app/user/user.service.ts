import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }

  register(body) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post('user/register', body, { headers: headers, observe: 'response' });
  }

  getUserProfile(id) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 'Accept': '*/*',
      'Authorization': currentUser.authorization
    });
    return this.httpClient.get('user/' + id, { headers: headers });
  }

  edit(body) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 'Accept': '*/*',
      'Authorization': currentUser.authorization
    });
    return this.httpClient.put('user/info/update', body, { headers: headers });
  }

}
