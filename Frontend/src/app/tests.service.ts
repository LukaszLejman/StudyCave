import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Set } from './set';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class TestsService {

  mainUrl = 'http://localhost:8080/';

  constructor(private http: Http, private router: Router) { }

  add(body) {
    const url = 'tests/';
    this.sendData(url, body);
  }

  sendData(url, body) {
    const headers = new Headers({ 'Content-Type': 'application/json' }); // błąd xml - Firefox
    const options = new RequestOptions({ headers: headers });
    this.http.post(this.mainUrl + url, body, options)
      .subscribe(data => { this.sendResponse(data); },
                 error => { alert('Coś poszło nie tak. Spróbuj ponownie później.'); }
      );
  }

  sendResponse(data) {
    if (data.status === 200) {
      alert('Operacja przebiegła pomyślnie!');
      this.router.navigate(['/']);
    } else {
      alert('Coś poszło nie tak. Spróbuj ponownie później.');
    }
  }

  getTest(id) {
    return this.http.get(this.mainUrl + 'tests/' + id + '/').map((data: Response) => data.json());
  }

}
