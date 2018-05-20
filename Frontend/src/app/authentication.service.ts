import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationService {
    private authUrl = 'http://localhost:8080/login';
    private headers = new Headers({'Content-Type': 'application/json'});
    public token: string;
    constructor(private http: Http) {
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post(this.authUrl, JSON.stringify({password: password, username: username}), {headers: this.headers})
            .map((response: Response) => {
                 console.log(response);
                // czy login ok jeśli w response jest token
                //const token = response.json() && response.json().token;
                const token = response.headers.get('authorization');
                console.log(token);
                if (token) {
                    // store username and jwt token w local storage aby nie wylogowało przy zmianie stron
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, authorization: token }));

                    // return true jeśli ok
                    return true;
                } else {
                    // return false jeśli nie
                    return false;
                }
            }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getToken(): String {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const token = currentUser && currentUser.token;
      return token ? token : '';
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
