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
      return this.httpClient.get('materials', {headers: this.headers});
    }

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
}
