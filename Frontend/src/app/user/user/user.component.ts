import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

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
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private userProfileSub: Subscription;
  private user: User = {
    id: 0,
    email: '',
    username: '',
    password: '',
    name: '',
    surname: ''
  };

  constructor(private userService: UserService, private router: Router) { }

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

  edit() {
    this.router.navigate(['edit-profile']);
  }

  ngOnInit() {
    this.getUserInfo();
  }

}
