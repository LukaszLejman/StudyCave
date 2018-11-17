import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../authentication.service';

@Injectable()
export class GroupsService {

  private headers;

  private getGroupsURL = 'groups';

  constructor(private httpClient: HttpClient, private router: Router,
    private authenticationService: AuthenticationService) {
    this.setHeaders();
  }

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

  getGroups(): Observable<any> {
    this.setHeaders();
    const url = this.getGroupsURL;
    return this.httpClient.get(url, { headers: this.headers });
  }

  postGroup(body): Observable<any> {
    this.setHeaders();
    const url = this.getGroupsURL;
    return this.httpClient.post(url, body, { headers: this.headers });
  }

  getGroupDetails(id): Observable<any> {
    const url = 'groups/' + id + '/info';
    return this.httpClient.get(url, { headers: this.headers });
  }

  deleteUser(id, userId): Observable<any> {
    const url = 'groups/' + id + '/member/' + userId ;
    return this.httpClient.delete(url, {headers: this.headers });
  }
  deleteGroup(id): Observable<any> {
    const url = 'groups/' + id + '/';
    return this.httpClient.delete(url, {headers: this.headers });
  }

  newKeyGenerate(id): Observable<any> {
    const url = 'groups/' + id + '/generate';
    return this.httpClient.get(url, { headers: this.headers });
  }
}
