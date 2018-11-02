import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';

import { GroupsService } from './groups.service';

import { MyGroupsComponent } from './my-groups/my-groups.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    MyGroupsComponent
  ],
  providers: [GroupsService]
})
export class GroupsModule { }
