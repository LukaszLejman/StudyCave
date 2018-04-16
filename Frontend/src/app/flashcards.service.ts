import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FlashcardsService {

  mainUrl = 'http://localhost:8080/';

  constructor(private http: Http, private httpFile: HttpClient) { }

  add(body) {
    const url = 'sets/';
    this.sendData(url, body);
  }

  sendData(url, body) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // błąd xml - Firefox
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.mainUrl + url, body, options)
      .subscribe(data => {this.sendResponse(data)},
                 error => {alert('Coś poszło nie tak. Spróbuj ponownie później.')}
                );
  }

  sendResponse(data) {
    if (data.status === 200) {
      alert('Operacja przebiegła pomyślnie!');
    } else {
      alert('Coś poszło nie tak. Spróbuj ponownie później.');
    }
  }

  // sending file - import flashcards from CSV
  pushFileToStorage(file: File, url: string): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.mainUrl + url, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.httpFile.request(req);
  }

}
