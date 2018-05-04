import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Set } from './set';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';


@Injectable()
export class FlashcardsService {

  mainUrl = 'http://localhost:8080/';

  constructor(private http: Http, private httpFile: HttpClient, private router: Router) { }

  add(body) {
    const url = 'sets/';
    this.sendData(url, body);
  }

  edit(body) {
    const url = 'sets/';
    this.putData(url, body);
  }

  getSets(): Observable<Set[]> {
    return this.http.get(this.mainUrl + 'sets/')
      .map((res: Response) => res.json());
  }

  sendData(url, body) {
    const headers = new Headers({ 'Content-Type': 'application/json' }); // błąd xml - Firefox
    const options = new RequestOptions({ headers: headers });
    this.http.post(this.mainUrl + url, body, options)
      .subscribe(data => { this.sendResponse(data); },
      error => { alert('Coś poszło nie tak. Spróbuj ponownie później.'); }
      );
  }

  putData(url, body) {
    this.http.put(this.mainUrl + url, body) // błąd xml - Firefox
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

  // sending file - import flashcards from CSV
  pushFileToStorage(file: File, user: string, url: string): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('id', user);
    const req = new HttpRequest('POST', this.mainUrl + url, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.httpFile.request(req);
  }

  getSet(id) {
    return this.http.get(this.mainUrl + 'sets/' + id + '/').map((data: Response) => data.json());
  }

  getTestPairing(id) {
    return this.http.get(this.mainUrl + 'sets/' + id + '/test/pairing/').map((data: Response) => data.json());
  }

  getTestFilling(id) {
    return this.http.get(this.mainUrl + 'sets/' + id + '/test/filling-in/').map((data: Response) => data.json());
  }

  getTestMemory(id) { // do zmiany adres
    return this.http.get(this.mainUrl + 'sets/' + id + '/test/memory/').map((data: Response) => data.json());
  }

  deleteSet (id) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(this.mainUrl + 'sets/' + id, options)
    .subscribe(data => { this.sendResponse(data); },
      error => { alert('Coś poszło nie tak. Spróbuj ponownie później.'); }
      );
  }

  // sprawdzanie testu - zapytanie dla jednej fiszki
  testCheck(id, body) {
    // id - id zestawu fiszek
    // ciało body = {id - idFiszki, content - wpisana odpowiedź, side - strona fiszki, którą widział użytkownik}
    return this.http.get(`${this.mainUrl}sets/${id}/${body['id']}/${body['content']}/${body['side']}/test/check/`)
      .map((data: Response) => data.json());
  }

  testMemory(id, body) {
    return this.http.get(`${this.mainUrl}sets/${id}/test/memory/check?x=${body['x']}&y=${body['y']}`)
      .map((data: Response) => data.json());
  }
}
