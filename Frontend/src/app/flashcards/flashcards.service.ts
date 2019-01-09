import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Set } from './set';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class FlashcardsService {

  // tslint:disable-next-line:max-line-length
  constructor(private httpClient: HttpClient, private router: Router, private authenticationService: AuthenticationService,
    public snackBar: MatSnackBar) { this.setHeaders(); }
  private headers;
  owner;

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

  changeSetPermission(id, permission) {
    this.setHeaders();
    this.httpClient.put('sets/' + id + '/permission', permission, { headers: this.headers })
      .subscribe();
  }

  add(body) {
    const url = 'sets/';
    this.sendData(url, body);
  }

  edit(body) {
    const url = 'sets/';
    this.putData(url, body);
  }

  getSets(): Observable<any> {
    this.setHeaders();
    return this.httpClient.get('sets', { headers: this.headers, params: { permission: 'Public' } });
  }
  getSetsOwners(): Observable<any> {
    this.setHeaders();
    const owner = JSON.parse(localStorage.getItem('currentUser'));
    return this.httpClient.get('sets', { headers: this.headers, params: { owner: owner.username } });
  }

  setOwner(owner) {
    if (owner === null) {
      this.owner = ' ';
    } else {
      this.owner = owner;
    }
  }

  getOwner() {
    return this.owner;
  }

  sendData(url, body) {
    this.setHeaders();
    this.httpClient.post(url, body, { headers: this.headers, observe: 'response' })
      .subscribe(data => { this.sendResponse(data); },
        error => {
          this.snackBar.open('Coś poszło nie tak. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        }
      );
  }

  putData(url, body) {
    this.setHeaders();
    this.httpClient.put(url, body, { headers: this.headers, observe: 'response' })
      .subscribe(data => { this.sendResponse(data); },
        error => {
          this.snackBar.open('Coś poszło nie tak. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        }
      );
  }

  sendResponse(data) {
    if (data.status === 200) {
      this.snackBar.open('Operacja przebiegła pomyślnie!', null,
        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
      this.router.navigate(['flashcards/sets']);
    } else {
      this.snackBar.open('Coś poszło nie tak. Spróbuj ponownie później.', null,
        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
    }
  }

  // sending file - import flashcards from CSV
  pushFileToStorage(file: File, user: string, permission: string, url: string): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('owner', user);
    formdata.append('permission', permission);
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

  getTestMemory(id) {
    return this.httpClient.get('sets/' + id + '/test/memory/').map((data: Array<Object>) => data);
  }

  deleteSet(id) {
    this.setHeaders();
    return this.httpClient.delete('sets/' + id, { headers: this.headers, observe: 'response' })
      .subscribe(data => { this.sendResponse(data); },
        error => {
          this.snackBar.open('Coś poszło nie tak. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        }
      );
  }

  // sprawdzanie testu - zapytanie dla jednej fiszki
  testCheck(id, body) {
    // id - id zestawu fiszek
    // ciało body = {id - idFiszki, content - wpisana odpowiedź, side - strona fiszki, którą widział użytkownik}
    this.setHeaders();
    return this.httpClient.get(`sets/${id}/${body['id']}/${body['content']}/${body['side']}/test/check/`, { headers: this.headers })
      .map((data: any) => data);
  }

  testMemory(id, body) {
    this.setHeaders();
    return this.httpClient.get(`sets/${id}/test/memory/check?x=${body['x']}&y=${body['y']}`, { headers: this.headers })
      .map((data: any) => data);
  }
}
