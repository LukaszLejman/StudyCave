import { Component, OnInit } from '@angular/core';
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
export class EditUserComponent implements OnInit {
  editStatus = false;
  invalidEdit = false;
  signInSub: Subscription;
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
    console.log(value.haslo);
    const body = {
      email: value.email,
      username: value.login,
      password: value.haslo,
      name: value.imie,
      surname: value.nazwisko
    };
    this.signInSub = this.userService.edit(body).subscribe(data => {
      this.editStatus = true;
      this.invalidEdit = false;
      this.getUserInfo();
    },
      error => {
        console.log(error);
        this.invalidEdit = true;
      },
      () => { }
    );
  }

  getUserInfo() {
    this.userProfileSub = this.userService.getUserProfile(1).subscribe(
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

}
