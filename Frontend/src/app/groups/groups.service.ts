import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { AuthenticationService } from '../authentication.service';
import { ResourceStatus } from './resource';
import { JoinToGroupForm } from './join-to-group/join-to-group';

@Injectable()
export class GroupsService {

  private headers;

  private getGroupsURL = 'groups';
  private getMaterialsToAddURL = 'users/materials?excludedGroupId={groupId}';
  private getTestsToAddURL = 'users/tests?excludedGroupId={groupId}';
  private getFlashcardsToAddURL = 'users/sets?excludedGroupId={groupId}';

  private getWaitingMaterialsInGroupURL = 'groups/{groupId}/content/materials/unverified';
  private getWaitingTestsInGroupURL = 'groups/{groupId}/content/tests/unverified';
  private getWaitingFlashcardsInGroupURL = 'groups/{groupId}/content/flashcards/unverified';

  private acceptMaterialsInGroupURL = 'groups/{groupId}/materials/{materialId}/status';
  private acceptTestsInGroupURL = 'groups/{groupId}/tests/{testId}/status';
  private acceptFlashcardsInGroupURL = 'groups/{groupId}/flashcard-sets/{setId}/status';

  private getActivityHistoryURL = 'groups/{groupId}/users/activity?sort={sort}';

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {
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

  deleteResource(id, resource, resId) {
    this.setHeaders();
    return this.httpClient.delete('groups/' + id + '/content/' + resource + '/' + resId, {
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

  getResource(id, resource): Observable<any> {
    const url = 'groups/' + id + '/content/' + resource;
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

  getWaitingMaterialsInGroup(id: number): Observable<any> {
    this.setHeaders();
    const url = this.getWaitingMaterialsInGroupURL.replace('{groupId}', id.toString());
    return this.httpClient.get(url, { headers: this.headers }).catch((error: any) => {
      return Observable.throw(error);
    });
  }

  getWaitingTestsInGroup(id: number): Observable<any> {
    this.setHeaders();
    const url = this.getWaitingTestsInGroupURL.replace('{groupId}', id.toString());
    return this.httpClient.get(url, { headers: this.headers }).catch((error: any) => {
      return Observable.throw(error);
    });
  }

  getWaitingFlashcardsInGroup(id: number): Observable<any> {
    this.setHeaders();
    const url = this.getWaitingFlashcardsInGroupURL.replace('{groupId}', id.toString());
    return this.httpClient.get(url, { headers: this.headers }).catch((error: any) => {
      return Observable.throw(error);
    });
  }

  acceptMaterialsInGroup(groupId: number, materialId: number, points: number, comment: string): Observable<any> {
    this.setHeaders();
    const url = this.acceptMaterialsInGroupURL.replace('{groupId}', groupId.toString()).replace('{materialId}', materialId.toString());
    const body = {
      points: points,
      status: ResourceStatus.accepted
    };
    if (comment.trim().length > 0) {
      body['comment'] = comment;
    }
    return this.httpClient.put(url, body, {
      headers: this.headers,
      observe: 'response',
      responseType: 'text'
    }).catch((error: any) => {
      return Observable.throw(error);
    });
  }

  acceptTestsInGroup(groupId: number, testId: number, points: number, comment: string): Observable<any> {
    this.setHeaders();
    const url = this.acceptTestsInGroupURL.replace('{groupId}', groupId.toString()).replace('{testId}', testId.toString());
    const body = {
      points: points,
      status: ResourceStatus.accepted
    };
    if (comment.trim().length > 0) {
      body['comment'] = comment;
    }
    return this.httpClient.put(url, body, {
      headers: this.headers,
      observe: 'response',
      responseType: 'text'
    }).catch((error: any) => {
      return Observable.throw(error);
    });
  }

  acceptFlashcardsInGroup(groupId: number, setId: number, points: number, comment: string): Observable<any> {
    this.setHeaders();
    const url = this.acceptFlashcardsInGroupURL.replace('{groupId}', groupId.toString()).replace('{setId}', setId.toString());
    const body = {
      points: points,
      status: ResourceStatus.accepted
    };
    if (comment.trim().length > 0) {
      body['comment'] = comment;
    }
    return this.httpClient.put(url, body, {
      headers: this.headers,
      observe: 'response',
      responseType: 'text'
    }).catch((error: any) => {
      return Observable.throw(error);
    });
  }

  rejectMaterialsFromGroup(groupId: number, materialId: number, comment: string): Observable<any> {
    this.setHeaders();
    const url = this.acceptMaterialsInGroupURL.replace('{groupId}', groupId.toString()).replace('{materialId}', materialId.toString());
    const body = {
      points: 0,
      status: ResourceStatus.rejected
    };
    if (comment.trim().length > 0) {
      body['comment'] = comment;
    }
    return this.httpClient.put(url, body, {
      headers: this.headers,
      observe: 'response',
      responseType: 'text'
    }).catch((error: any) => {
      return Observable.throw(error);
    });
  }

  rejectTestsFromGroup(groupId: number, testId: number, comment: string): Observable<any> {
    this.setHeaders();
    const url = this.acceptTestsInGroupURL.replace('{groupId}', groupId.toString()).replace('{testId}', testId.toString());
    const body = {
      points: 0,
      status: ResourceStatus.rejected
    };
    if (comment.trim().length > 0) {
      body['comment'] = comment;
    }
    return this.httpClient.put(url, body, {
      headers: this.headers,
      observe: 'response',
      responseType: 'text'
    }).catch((error: any) => {
      return Observable.throw(error);
    });
  }

  rejectFlashcardsFromGroup(groupId: number, setId: number, comment: string): Observable<any> {
    this.setHeaders();
    const url = this.acceptFlashcardsInGroupURL.replace('{groupId}', groupId.toString()).replace('{setId}', setId.toString());
    const body = {
      points: 0,
      status: ResourceStatus.rejected
    };
    if (comment.trim().length > 0) {
      body['comment'] = comment;
    }
    return this.httpClient.put(url, body, {
      headers: this.headers,
      observe: 'response',
      responseType: 'text'
    }).catch((error: any) => {
      return Observable.throw(error);
    });
  }

  getGlobalRanking(groupId: number): Observable<any> {
    this.setHeaders();
    return this.httpClient.get(`groups/${groupId}/leaderboard`, { headers: this.headers }).catch((error: any) => {
      return Observable.throw(error);
    });
  }

  getTestsRanking(groupId: number): Observable<any> {
    this.setHeaders();
    return this.httpClient.get(`groups/${groupId}/testleaderboard`, { headers: this.headers }).catch((error: any) => {
      return Observable.throw(error);
    });
  }

  getActivityHistory(id: number, sort = 'DESC', startDate: Date = null, endDate: Date = null): Observable<any> {
    this.setHeaders();
    let url = this.getActivityHistoryURL.replace('{groupId}', id.toString())
      .replace('{sort}', sort);
    if (startDate !== null) {
      const startDateStr = `${startDate.getFullYear()}-${this.pad(startDate.getMonth() + 1)}-${this.pad(startDate.getDate())}`;
      const endDateStr = `${endDate.getFullYear()}-${this.pad(endDate.getMonth() + 1)}-${this.pad(endDate.getDate())}`;
      url = url + `&startDate=${startDateStr}&endDate=${endDateStr}`;
    }
    return this.httpClient.get(url, { headers: this.headers }).catch((error: any) => {
      return Observable.throw(error);
    });
  }

  private pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }

}
