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

}
