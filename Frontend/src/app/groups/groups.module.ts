import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogModule } from 'primeng/dialog';

import { GroupsService } from './groups.service';

import { MyGroupsComponent } from './my-groups/my-groups.component';
import { GroupCreatorComponent } from './group-creator/group-creator.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    MatSnackBarModule,
    DialogModule
  ],
  declarations: [
    MyGroupsComponent,
    GroupCreatorComponent
  ],
  providers: [GroupsService]
})
export class GroupsModule { }
