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
    const url = this.getGroupsURL;
    return this.httpClient.get(url, { headers: this.headers });
  }

  postGroup(body): Observable<any> {
    const url = this.getGroupsURL;
    return this.httpClient.post(url, body, { headers: this.headers });
  }

  public joinToGroup(nameAndCodeOfGroup: JoinToGroupForm): Observable<any> {
    return this.httpClient.post('groups/join-to-group', nameAndCodeOfGroup, { headers: this.headers });
    //  uncomment if request is get not post
    // return this.httpClient.get(
    //   `groups/join-to-group?name=${nameAndCodeOfGroup.name}&code=${nameAndCodeOfGroup.code}`,
    //   { headers: this.headers }
    // );
  }

}
