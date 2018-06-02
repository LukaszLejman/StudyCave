import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class TestsService {

  // tslint:disable-next-line:max-line-length
  constructor(private httpClient: HttpClient, private router: Router,
    private authenticationService: AuthenticationService) {
    this.setHeaders();
  }

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

  add(body) {
    const url = 'tests/';
    this.sendData(url, body);
  }

  edit(body) {
    const url = 'tests/';
    this.putData(url, body);
  }

  putData(url, body) {
    this.httpClient.put(url, body, { headers: this.headers, observe: 'response' })
      .subscribe(
      data => { this.sendResponse(data); },
      error => { alert('Coś poszło nie tak. Spróbuj ponownie później.'); }
      );
  }

  sendData(url, body) {
    this.httpClient.post(url, body, { headers: this.headers, observe: 'response' })
      .subscribe(
      data => { this.sendResponse(data); },
      error => { alert('Coś poszło nie tak. Spróbuj ponownie później.'); }
      );
  }

  sendResponse(data) {
    if (data.status === 200) {
      alert('Operacja przebiegła pomyślnie!');
      this.router.navigate(['tests']);
    } else {
      alert('Coś poszło nie tak. Spróbuj ponownie później.');
    }
  }

  getTest(id): Observable<any> {
    return this.httpClient.get('tests/' + id + '/', { headers: this.headers });
  }

  getUserTests(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return this.httpClient.get('tests?owner=' + user.username, { headers: this.headers });
  }

  getTests(): Observable<any> {
    return this.httpClient.get('tests?permission=public', { headers: this.headers });
  }

  removeTest(id): Observable<any> {
    return this.httpClient.delete('tests/' + id + '/', { headers: this.headers });
  }
}
