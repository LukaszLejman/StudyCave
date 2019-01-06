import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UserService } from './user.service';
import { EditUserComponent } from './edit-user/edit-user.component';
import { BagdesComponent } from './bagdes/bagdes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  declarations: [RegisterComponent, UserComponent, EditUserComponent, BagdesComponent],
  exports: [RegisterComponent],
  providers: [UserService]
})
export class UserModule { }
