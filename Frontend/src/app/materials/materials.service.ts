import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class MaterialsService {

  // tslint:disable-next-line:max-line-length
  constructor(private httpClient: HttpClient, private router: Router, private authenticationService: AuthenticationService ) { this.setHeaders(); }

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
      }else {
        this.headers = new HttpHeaders({
          'Content-Type': 'application/json'});
        }
  }

    getMaterials(): Observable<any> {
          return this.httpClient.get('file/materials/', {headers: this.headers, params: { permission: 'Public'}});
    }

    getMaterialsOwners(): Observable<any> {
      const owner = JSON.parse(localStorage.getItem('currentUser'));
      return this.httpClient.get('file/materials/', {headers: this.headers, params: { owner: owner.username}});
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
      this.httpClient.put('file/materials/' + id + '/permission', permission , {headers: this.headers})
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
        error => { alert('error 123 Coś poszło nie tak. Spróbuj ponownie później.'); }
        );

    }
    sendData(url, body) {
      this.httpClient.post(url, body, { headers: this.headers, observe: 'response' })
        .subscribe(data => { this.sendResponse(data); },
        error => { alert('Coś poszło nie tak. Spróbuj ponownie później.'); }
        );
    }

    putData(url, body) {
      this.httpClient.put(url, body, { headers: this.headers,  observe: 'response' })
        .subscribe(data => { this.sendResponse(data); },
        error => { alert('Coś poszło nie tak. Spróbuj ponownie później.'); }
        );
    }

    downloadFile(id) {
      return this.httpClient.get('/file/files/' + id, {
        responseType: 'blob',
        headers: this.headers
      });
    }

    sendResponse(data) {
      if (data.status === 200) {
        alert('Operacja przebiegła pomyślnie!');
        this.router.navigate(['materials/list']);
      } else {
        alert('Coś poszło nie tak. Spróbuj ponownie później.');
      }
    }
}
