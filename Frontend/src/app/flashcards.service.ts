import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Set } from './set';
import 'rxjs/add/operator/map';


@Injectable()
export class FlashcardsService {

  mainUrl = 'http://localhost:8080/';

  constructor(private http: Http, private httpFile: HttpClient) { }

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

}
