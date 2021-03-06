import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs/Subscription';

declare global {
  interface User {
    id: Number;
    email: string;
    username: string;
    password: string;
    name: string;
    surname: string;
  }
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {
  editStatus = false;
  invalidEdit = false;
  invalidPassword = false;
  errorMessage = '';
  editSub: Subscription;
  private userProfileSub: Subscription;
  private relogSub: Subscription;
  private user: User = {
    id: 0,
    email: '',
    username: '',
    password: '',
    name: '',
    surname: ''
  };

  constructor(private router: Router, private userService: UserService) { }

  edit(value: any) {
    if (value.password === value.password2) {
      const body = {
        id: this.user.id,
        email: value.email,
        username: value.login,
        password: value.password,
        name: value.name,
        surname: value.surname
      };
      this.editSub = this.userService.edit(body).subscribe(data => {
        this.invalidPassword = false;
        if (data === 'Login zajety') {
          this.errorMessage = 'Login zajęty. Wybierz inny.';
          this.invalidEdit = true;
        } else if (data === 'Email zajety') {
          this.errorMessage = 'E-mail zajęty. Wybierz inny.';
          this.invalidEdit = true;
        } else {
          const usernameChange = JSON.parse(localStorage.getItem('currentUser'));
          usernameChange.username = value.login;
          this.relogSub = this.userService.login(body.username, body.password).subscribe(
            d => {
              this.editSub.unsubscribe();
            }
          );
          const usernameChangeStr = JSON.stringify(usernameChange);
          localStorage.setItem('currentUser', usernameChangeStr);
          this.editStatus = true;
          this.invalidEdit = false;
        }
      },
        error => {
          this.errorMessage = 'Wystąpił błąd. Spróbuj ponownie później.';
          this.invalidEdit = true;
          this.invalidPassword = false;
        },
        () => { }
      );
    } else {
      this.invalidPassword = true;
      this.invalidEdit = false;
    }
  }

  getUserInfo() {
    this.userProfileSub = this.userService.getUserProfile().subscribe(
      (d: User) => {
        this.user.id = d.id;
        this.user.email = d.email;
        this.user.username = d.username;
        this.user.password = d.password;
        this.user.name = d.name;
        this.user.surname = d.surname;
      }
    );

  }

  ngOnInit() {
    this.getUserInfo();
  }

  ngOnDestroy() {
    if (this.editSub) { this.userProfileSub.unsubscribe(); }
    if (this.relogSub) { this.relogSub.unsubscribe(); }
    if (this.editSub) {
      this.editSub.unsubscribe();
    }
  }

}
