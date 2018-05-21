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
        this.registerStatus = true;
        this.invalidRegister = false;
        console.log('git', data);
      },
      error => {
        console.log('blad', error);
        if (error.error.text === 'Login zajety') {
          this.errorMessage = 'Login zajęty. Wybierz inny.';
        } else if (error.error.text === 'Email zajety') {
          this.errorMessage = 'E-mail zajęty. Wybierz inny.';
        } else {
          this.errorMessage = 'Wystąpił błąd. Spróbuj ponownie.';
        }
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
