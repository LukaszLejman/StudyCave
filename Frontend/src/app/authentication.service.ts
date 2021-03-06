import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthenticationService {
    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private storageSub = new Subject<boolean>();
    public token: string;
    constructor(private http: HttpClient, public snackBar: MatSnackBar) {
    }

    watchStorage(): Observable<any> {
        return this.storageSub.asObservable();
    }

    watchStorageChanges(): void {
        this.storageSub.next(true);
    }


    login(username: string, password: string): Observable<boolean> {
        return this.http.post('login', { password: password, username: username }, { headers: this.headers, observe: 'response' })
            .map((response) => {
                // czy login ok jeśli w response jest token
                // const token = response.json() && response.json().token;
                const token = response.headers.get('authorization');
                if (token) {
                    // store username and jwt token w local storage aby nie wylogowało przy zmianie stron
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, authorization: token }));
                    this.getLoggedInName.emit('logged');
                    this.storageSub.next(true);
                    this.snackBar.open('Zalogowano pomyślnie!', null,
                        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
                    // return true jeśli ok
                    return true;
                } else {
                    // return false jeśli nie
                    this.getLoggedInName.emit('notLogged');
                    return false;
                }
            }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getToken(): String {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser.authorization == null) {
            return ' ';
        } else {
            return currentUser.authorization;
        }
    }

    isLoggedIn(): boolean {
        const token: String = this.getToken();
        return token && token.length > 0;
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.snackBar.open('Wylogowano pomyślnie!', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
        localStorage.removeItem('currentUser');
    }
}
