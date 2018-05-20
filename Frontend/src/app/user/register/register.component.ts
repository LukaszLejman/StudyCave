import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerStatus = false;
  invalidRegister = false;
  signInSub: Subscription;
  constructor(private userService: UserService) { }

  onSubmit(value: any) {
    this.signInSub = this.userService.register({
      email: value.email,
      username: value.login,
      password: value.password,
      name: value.name,
      surname: value.surname
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

  ngOnDestroy() {
    if (this.signInSub) {
      this.signInSub.unsubscribe();
    }
  }

}
