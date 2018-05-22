import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerStatus = false;
  invalidRegister = false;
  errorMessage = '';
  signInSub: Subscription;
  constructor(private userService: UserService) { }

  onSubmit(value: any) {
    this.signInSub = this.userService.register({
      email: value.email,
      username: value.login,
      password: value.password,
      name: value.name,
      surname: value.surname
    }).subscribe(
      data => {
        if (data === 'Login zajety') {
          this.errorMessage = 'Login zajęty. Wybierz inny.';
          this.invalidRegister = true;
        } else if (data === 'Email zajety') {
          this.errorMessage = 'E-mail zajęty. Wybierz inny.';
          this.invalidRegister = true;
        } else {
          this.registerStatus = true;
          this.invalidRegister = false;
        }
      },
      error => {
        this.errorMessage = 'Wystąpił błąd. Spróbuj ponownie później.';
        this.invalidRegister = true;
      },
      () => { }
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.signInSub) {
      this.signInSub.unsubscribe();
    }
  }

}
