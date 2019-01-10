import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SharedService {

  constructor(private httpClient: HttpClient, private router: Router, private authenticationService: AuthenticationService,
     public snackBar: MatSnackBar)
  // tslint:disable-next-line:one-line
  {
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

  getComments(id, what): Observable<any> {
    this.setHeaders();
    return this.httpClient.get('groups/' + what + '/' + id + '/comments', {headers: this.headers});
  }

  sendComment(id, what, data) {
    this.setHeaders();
    return this.httpClient.post('groups/' + what + '/' + id + '/comments', data , {
      headers: this.headers,
      observe: 'response',
      responseType: 'text'
    })
    .subscribe(
      response => {
        this.snackBar.open('Dodano komentarz', null,
        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
      },
      error => {
      this.snackBar.open('Coś poszło nie tak. Spróbuj ponownie później.', null,
        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
  });
  }

  deleteComment(comment) {
    this.setHeaders();
    return this.httpClient.delete('groups/comments/' + comment, {
      headers: this.headers,
      observe: 'response',
      responseType: 'text'
    })
    .subscribe(
      response => {
        this.snackBar.open('Usunięto komentarz', null,
        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
      },
      error => {
      this.snackBar.open('Coś poszło nie tak. Spróbuj ponownie później.', null,
        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
  });
  }
}
