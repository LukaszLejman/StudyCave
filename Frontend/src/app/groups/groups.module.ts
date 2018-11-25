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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { GroupsService } from './groups.service';

import { MyGroupsComponent } from './my-groups/my-groups.component';
import { GroupCreatorComponent } from './group-creator/group-creator.component';
import { JoinToGroupComponent } from './join-to-group/join-to-group.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { ManageGroupComponent } from './manage-group/manage-group.component';
import { SharingResourcesInGroupsComponent } from './sharing-resources-in-groups/sharing-resources-in-groups.component';
import { ListboxModule } from 'primeng/listbox';

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
    DialogModule,
    ConfirmDialogModule,
    ListboxModule
  ],
  declarations: [
    MyGroupsComponent,
    GroupCreatorComponent,
    JoinToGroupComponent,
    GroupDetailsComponent,
    ManageGroupComponent,
    SharingResourcesInGroupsComponent
  ],
  providers: [GroupsService, ConfirmationService]
})
export class GroupsModule { }

