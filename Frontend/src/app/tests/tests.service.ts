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

  constructor(private httpClient: HttpClient, private router: Router, private authenticationService: AuthenticationService) { }
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': '' + this.authenticationService.getToken()
    });

  add(body) {
    const url = 'tests/';
    this.sendData(url, body);
  }

  sendData(url, body) {
    this.httpClient.post(url, body, { headers: this.headers, observe: 'response' })
      .subscribe(data => { this.sendResponse(data); },
      error => { alert('Coś poszło nie tak. Spróbuj ponownie później.'); }
      );
  }

  sendResponse(data) {
    if (data.status === 200) {
      alert('Operacja przebiegła pomyślnie!');
      this.router.navigate(['flashcards/sets']);
    } else {
      alert('Coś poszło nie tak. Spróbuj ponownie później.');
    }
  }

  getTest(id) {
    return this.httpClient.get('tests/' + id + '/', { headers: this.headers});
  }

}
