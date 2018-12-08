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
  private getMaterialsToAddURL = 'users/materials?excludedGroupId={groupId}';
  private getTestsToAddURL = 'users/sets?excludedGroupId={groupId}';
  private getFlashcardsToAddURL = 'users/tests?excludedGroupId={groupId}';

  private getMaterialsInGroupURL = '';
  private getTestsInGroupURL = '';
  private getFlashcardsInGroupURL = '';

  private confirmMaterialsInGroupURL = '';
  private confirmTestsInGroupURL = '';
  private confirmFlashcardsInGroupURL = '';

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

  public joinToGroup(nameAndCodeOfGroup: JoinToGroupForm): Observable<any> {
    this.setHeaders();
    return this.httpClient.post(`groups/members`,
      { groupCode: nameAndCodeOfGroup.code },
      {
        headers: this.headers,
        observe: 'response',
        responseType: 'text'
      }).catch((error: any) => {
        return Observable.throw(error);
      });
  }

  getGroupDetails(id): Observable<any> {
    const url = 'groups/' + id + '/info';
    this.setHeaders();
    return this.httpClient.get(url, { headers: this.headers });
  }

  deleteUser(id, userId): Observable<any> {
    const url = 'groups/' + id + '/member/' + userId;
    this.setHeaders();
    return this.httpClient.delete(url, { headers: this.headers });
  }

  deleteGroup(id): Observable<any> {
    const url = 'groups/' + id;
    this.setHeaders();
    return this.httpClient.delete(url, { headers: this.headers });
  }

  newKeyGenerate(id): Observable<any> {
    const url = 'groups/' + id + '/generate';
    this.setHeaders();
    return this.httpClient.get(url, { headers: this.headers });
  }

  getMaterialsToAdd(id: number): Observable<any> {
    this.setHeaders();
    const url = this.getMaterialsToAddURL.replace('{groupId}', id.toString());
    return this.httpClient.get(url, { headers: this.headers }).catch((error: any) => {
      return Observable.throw(error);
    });
  }

  getTestsToAdd(id: number): Observable<any> {
    this.setHeaders();
    const url = this.getTestsToAddURL.replace('{groupId}', id.toString());
    return this.httpClient.get(url, { headers: this.headers }).catch((error: any) => {
      return Observable.throw(error);
    });
  }

  getFlashcardsToAdd(id: number): Observable<any> {
    this.setHeaders();
    const url = this.getFlashcardsToAddURL.replace('{groupId}', id.toString());
    return this.httpClient.get(url, { headers: this.headers }).catch((error: any) => {
      return Observable.throw(error);
    });
  }

  addFlashcardsToGroup(group: number, flashcard: Array<string>): Observable<any> {
    const testToSend = flashcard.map(item => {
      return { setId: item };
    });
    this.setHeaders();
    return this.httpClient.post(`groups/${group}/flashcard-sets`,
      testToSend,
      {
        headers: this.headers,
        observe: 'response',
        responseType: 'text'
      }).catch((error: any) => {
        return Observable.throw(error);
      });
  }

  addTestsToGroup(group: number, tests: Array<string>): Observable<any> {
    const testToSend = tests.map(item => {
      return { testId: item };
    });
    this.setHeaders();
    return this.httpClient.post(`groups/${group}/tests`,
      testToSend,
      {
        headers: this.headers,
        observe: 'response',
        responseType: 'text'
      }).catch((error: any) => {
        return Observable.throw(error);
      });
  }

  addMaterialsToGroup(group: number, materials: Array<string>): Observable<any> {
    const testToSend = materials.map(item => {
      return { materialId: item };
    });
    this.setHeaders();
    return this.httpClient.post(`groups/${group}/materials`,
      testToSend,
      {
        headers: this.headers,
        observe: 'response',
        responseType: 'text'
      }).catch((error: any) => {
        return Observable.throw(error);
      });
  }

  getMaterialsInGroup(id: number): Observable<any> {
    this.setHeaders();
    const url = this.getMaterialsInGroupURL.replace('{groupId}', id.toString());
    return this.httpClient.get(url, { headers: this.headers }).catch((error: any) => {
      return Observable.throw(error);
    });
  }

  getTestsInGroup(id: number): Observable<any> {
    this.setHeaders();
    const url = this.getTestsInGroupURL.replace('{groupId}', id.toString());
    return this.httpClient.get(url, { headers: this.headers }).catch((error: any) => {
      return Observable.throw(error);
    });
  }

  getFlashcardsInGroup(id: number): Observable<any> {
    this.setHeaders();
    const url = this.getFlashcardsInGroupURL.replace('{groupId}', id.toString());
    return this.httpClient.get(url, { headers: this.headers }).catch((error: any) => {
      return Observable.throw(error);
    });
  }

  confirmMaterialsInGroup(groupId: number, materialId: number, points: number, ownerId: number, comment: string): Observable<any> {
    this.setHeaders();
    const url = this.confirmMaterialsInGroupURL.replace('{groupId}', groupId.toString());
    const body = {
      materialId: materialId,
      points: points,
      ownerId: ownerId
    };
    if (comment.trim().length > 0) {
      body['comment'] = comment;
    }
    return this.httpClient.post(url, body, {
        headers: this.headers,
        observe: 'response',
        responseType: 'text'
      }).catch((error: any) => {
        return Observable.throw(error);
      });
  }

  confirmTestsInGroup(groupId: number, testId: number, points: number, ownerId: number, comment: string): Observable<any> {
    this.setHeaders();
    const url = this.confirmMaterialsInGroupURL.replace('{groupId}', groupId.toString());
    const body = {
      testId: testId,
      points: points,
      ownerId: ownerId
    };
    if (comment.trim().length > 0) {
      body['comment'] = comment;
    }
    return this.httpClient.post(url, body, {
        headers: this.headers,
        observe: 'response',
        responseType: 'text'
      }).catch((error: any) => {
        return Observable.throw(error);
      });
  }

  confirmFlashcardsInGroup(groupId: number, flashcardsId: number, points: number, ownerId: number, comment: string): Observable<any> {
    this.setHeaders();
    const url = this.confirmMaterialsInGroupURL.replace('{groupId}', groupId.toString());
    const body = {
      flashcardsId: flashcardsId,
      points: points,
      ownerId: ownerId
    };
    if (comment.trim().length > 0) {
      body['comment'] = comment;
    }
    return this.httpClient.post(url, body, {
        headers: this.headers,
        observe: 'response',
        responseType: 'text'
      }).catch((error: any) => {
        return Observable.throw(error);
      });
  }

  rejectMaterialsFromGroup(groupId: number, materialId: number, ownerId: number, comment: string): Observable<any> {
    this.setHeaders();
    const url = this.confirmMaterialsInGroupURL.replace('{groupId}', groupId.toString());
    const body = {
      materialId: materialId,
      ownerId: ownerId
    };
    if (comment.trim().length > 0) {
      body['comment'] = comment;
    }
    return this.httpClient.post(url, body, {
        headers: this.headers,
        observe: 'response',
        responseType: 'text'
      }).catch((error: any) => {
        return Observable.throw(error);
      });
  }

  rejectTestsFromGroup(groupId: number, testId: number, ownerId: number, comment: string): Observable<any> {
    this.setHeaders();
    const url = this.confirmMaterialsInGroupURL.replace('{groupId}', groupId.toString());
    const body = {
      testId: testId,
      ownerId: ownerId
    };
    if (comment.trim().length > 0) {
      body['comment'] = comment;
    }
    return this.httpClient.post(url, body, {
        headers: this.headers,
        observe: 'response',
        responseType: 'text'
      }).catch((error: any) => {
        return Observable.throw(error);
      });
  }

  rejectFlashcardsFromGroup(groupId: number, flashcardsId: number, ownerId: number, comment: string): Observable<any> {
    this.setHeaders();
    const url = this.confirmMaterialsInGroupURL.replace('{groupId}', groupId.toString());
    const body = {
      flashcardsId: flashcardsId,
      ownerId: ownerId
    };
    if (comment.trim().length > 0) {
      body['comment'] = comment;
    }
    return this.httpClient.post(url, body, {
        headers: this.headers,
        observe: 'response',
        responseType: 'text'
      }).catch((error: any) => {
        return Observable.throw(error);
      });
  }

}
