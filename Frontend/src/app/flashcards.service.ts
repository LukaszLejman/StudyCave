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

  constructor(private httpClient: HttpClient, private router: Router) { }

  add(body) {
    const url = 'sets/';
    this.sendData(url, body);
  }

  edit(body) {
    const url = 'sets/';
    this.putData(url, body);
  }

  getSets(): Observable<any> {
    return this.httpClient.get('sets');
  }

  sendData(url, body) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // błąd xml - Firefox
    this.httpClient.post(url, body, { headers: headers, observe: 'response' })
      .subscribe(data => { this.sendResponse(data); },
      error => { alert('Coś poszło nie tak. Spróbuj ponownie później.'); }
      );
  }

  putData(url, body) {
    this.httpClient.put(url, body, { observe: 'response' }) // błąd xml - Firefox
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
    const req = new HttpRequest('POST', url, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.httpClient.request(req);
  }

  getSet(id) {
    return this.httpClient.get('sets/' + id + '/');
  }

  getTestPairing(id) {
    return this.httpClient.get('sets/' + id + '/test/pairing/');
  }

  getTestFilling(id) {
    return this.httpClient.get('sets/' + id + '/test/filling-in/').map((data: Array<Object>) => data);
  }

  getTestMemory(id) { // do zmiany adres
    return this.httpClient.get('sets/' + id + '/test/memory/').map((data: Array<Object>) => data);
  }

  deleteSet(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // błąd xml - Firefox
    return this.httpClient.delete('sets/' + id, { headers: headers, observe: 'response' })
      .subscribe(data => { this.sendResponse(data); },
      error => { alert('Coś poszło nie tak. Spróbuj ponownie później.'); }
      );
  }

  // sprawdzanie testu - zapytanie dla jednej fiszki
  testCheck(id, body) {
    // id - id zestawu fiszek
    // ciało body = {id - idFiszki, content - wpisana odpowiedź, side - strona fiszki, którą widział użytkownik}
    return this.httpClient.get(`sets/${id}/${body['id']}/${body['content']}/${body['side']}/test/check/`)
      .map((data: any) => data);
  }

  testMemory(id, body) {
    return this.httpClient.get(`sets/${id}/test/memory/check?x=${body['x']}&y=${body['y']}`)
      .map((data: any) => data);
  }
}
