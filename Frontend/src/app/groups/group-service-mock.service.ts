import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class GroupServiceMockService {

  constructor() { }

  getResource(id, resource): Observable<any> {
    const mockData = [
      {
        'id': 12,
        'title': 'x',
        'addDate': '2019-01-11',
        'owner': 'lukasz',
        'grade': 0
      }
    ];
    return of(mockData);
  }

  getGroupDetails(id): Observable<any> {
    const mockData = {
      'id': 1,
      'owner': 'lukasz',
      'name': 'aaa',
      'description': 'aaa',
      'groupKey': 'wicRLCNW5m',
      'users': [
        {
          'username': 'ukasz',
          'id': 13
        }
      ]
    };
    return of(mockData);
  }

  getActivityHistory(id: number, sort = 'DESC', startDate: Date = null, endDate: Date = null): Observable<any> {
    const mockData = [{
      'date': '01/02/2019',
      'from': 'test',
      'to': 'test2',
      'type': 'type1',
      'points': 21,
      'comment': 'comment1',
      'resourceType': 'resourceType1',
      'resourceName': 'resourceName1',
      'd': 21,
    }];
    return of(mockData);
  }

  newKeyGenerate(id): Observable<any> {
    const mockData = 'XYZ';
    return of(mockData);
  }

  getGroups(): Observable<any> {
    const mockData = [{
      'id': 1,
      'owner': 'lukasz',
      'name': 'aaa',
      'description': 'aaa',
      'groupKey': 'wicRLCNW5m',
      'users': [
        {
          'username': 'ukasz',
          'id': 13
        }
      ]
    }];
    return of(mockData);
  }

  getGlobalRanking(groupId: number): Observable<any> {
    const mockData = [{
      'points': 1,
      'username': 'lukasz',
    },
    {
      'points': 2,
      'username': 'lukasz2',
    }];
    return of(mockData);
  }

  getTestsRanking(groupId: number): Observable<any> {
    const mockData = [{
      'points': 1,
      'username': 'lukasz',
    },
    {
      'points': 2,
      'username': 'lukasz2',
    }];
    return of(mockData);
  }

}
