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

}
