import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FlashcardsService {

  mainUrl = 'http://localhost:8080/';
  res = true;

  constructor(private http: Http) { }

  sendData(url, body) {
    this.http.post(this.mainUrl + url, body)
      .subscribe(data => this.sendResponse(data));
    return this.res;
  }

  sendResponse(data) {
    if (data.status === 200) {
      this.res = true;
    } else {
      this.res = false;
    }
  }

  add(body) {
    const url = '';
    const isOk = this.sendData(url, body);
    return isOk;
  }

  postFile(fileToUpload: File)/*: Observable<boolean>*/ {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    console.log(fileToUpload)
    /*return this.httpClient
      .post(endpoint, formData)
      .map(() => { return true; })
      .catch((e) => this.handleError(e));*/
  }

}
