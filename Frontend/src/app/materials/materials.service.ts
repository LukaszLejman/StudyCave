import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class MaterialsService {

  // tslint:disable-next-line:max-line-length
  constructor(private httpClient: HttpClient, private router: Router, private authenticationService: AuthenticationService,
    public snackBar: MatSnackBar) { this.setHeaders(); }

  private headers;

  private owner = JSON.parse(localStorage.getItem('currentUser'));
  private own;
  private title;
  private perm;

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

  getMaterials(): Observable<any> {
    this.setHeaders();
    return this.httpClient.get('file/materials/', { headers: this.headers, params: { permission: 'Public' } });
  }

  getMaterialsOwners(): Observable<any> {
    const owner = JSON.parse(localStorage.getItem('currentUser'));
    this.setHeaders();
    return this.httpClient.get('file/materials/', { headers: this.headers, params: { owner: owner.username } });
  }
  pushFileToStorage(file: File, user: string, title: string, permission: string, url: string): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('owner', user);
    formdata.append('title', title);
    formdata.append('permission', permission);
    formdata.append('grade', '0');
    const req = new HttpRequest('POST', url, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.httpClient.request(req);
  }

  changeMatPermission(id, permission) {
    this.setHeaders();
    this.httpClient.put('file/materials/' + id + '/permission', permission, { headers: this.headers })
      .subscribe();
  }

  setOwner(own) {
    this.own = own;
  }

  getOwner() {
    return this.own;
  }
  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }
  setPerm(perm) {
    this.perm = perm;
  }

  getPerm() {
    return this.perm;
  }
  deleteMat(id) {
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
    return this.httpClient.delete('file/delete/' + id, { headers: this.headers, observe: 'response', responseType: 'text' })
      .subscribe(data => { this.sendResponse(data); },
        error => {
          this.snackBar.open('Coś poszło nie tak. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        }
      );

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

  downloadFile(id) {
    this.setHeaders();
    return this.httpClient.get('/file/files/' + id, {
      responseType: 'blob',
      headers: this.headers
    });
  }

  sendResponse(data) {
    if (data.status === 200) {
      this.snackBar.open('Operacja przebiegła pomyślnie!', null,
        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
      this.router.navigate(['materials/list']);
    } else {
      this.snackBar.open('Coś poszło nie tak. Spróbuj ponownie później.', null,
        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
    }
  }
}
