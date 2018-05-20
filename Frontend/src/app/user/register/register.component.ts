import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerStatus = false;
  invalidRegister = false;
  signInSub: Subscription;
  constructor(private userService: UserService) { }

  onSubmit(value: any) {
    this.signInSub = this.userService.register({
      email: value.email,
      username: value.login,
      password: value.haslo,
      name: value.imie,
      surname: value.nazwisko
    }).subscribe(data => {
      this.registerStatus = true;
      this.invalidRegister = false;
    },
      error => {
        console.log(error);
        this.invalidRegister = true;
      },
      () => { }
      );
  }

  ngOnInit() {
  }

}
