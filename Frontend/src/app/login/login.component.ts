import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {

    public isLogin: Boolean = false;
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        public snackBar: MatSnackBar) { }

    ngOnInit() {
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.isLogin = true;
                    this.router.navigate(['home']);
                    this.snackBar.open('Zalogowano pomyślnie.', null,
                        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                    this.snackBar.open('Niepoprawne hasło lub login.', null,
                        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
                }
            }, error => {
                this.loading = false;
                this.error = error;
                this.snackBar.open('Niepoprawne hasło lub login.', null,
                    { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
            });
    }
}
