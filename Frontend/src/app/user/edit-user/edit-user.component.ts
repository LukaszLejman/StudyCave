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
    console.log(value.password === value.password2);;
    if (value.password === value.password2) {
      const body = {
        id: this.user.id,
        email: value.email,
        username: value.login,
        password: value.password,
        name: value.name,
        surname: value.surname
      };
      console.log(body);
      this.editSub = this.userService.edit(body).subscribe(data => {
        this.editStatus = true;
        this.invalidEdit = false;
        this.invalidPassword = false;
        this.getUserInfo();
      },
        error => {
          console.log(error);
          if (error.error.text === 'Login zajety') {
            this.errorMessage = 'Login zajęty. Wybierz inny.';
          }
          this.errorMessage = error.error.text;
          this.invalidEdit = true;
          this.invalidPassword = false;
        },
        () => { }
      );
    } else {
      this.invalidPassword = true;
    }
  }

  getUserInfo() {
    this.userProfileSub = this.userService.getUserProfile().subscribe(
      (d: User) => {
        console.log(d);
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
    this.userProfileSub.unsubscribe();
    if (this.editSub) {
      this.editSub.unsubscribe();
    }
  }

}
