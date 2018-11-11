import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService } from '../groups.service';
import { Subscription } from 'rxjs/Subscription';
import { Group } from '../group';
import { GridOptions } from 'ag-grid';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-manage-group',
  templateUrl: './manage-group.component.html',
  styleUrls: ['./manage-group.component.css']
})

export class ManageGroupComponent implements OnInit, OnDestroy {
  id: number;
  currentUser: string;
  groupDetailsSubscription: Subscription;
  groupUserListSubscription: Subscription;
  userDeleteSubscription: Subscription;
  groupDeleteSubscription: Subscription;
  newKeyGenerateSubscription: Subscription;
  display = false;


  private gridApi;
  public gridOptions: GridOptions;

  public columnDefs = [
    { headerName: 'Użytkownik', field: 'login', headerTooltip: 'Login użytkownika' },
    {
      headerName: '',
      suppressMenu: true,
      suppressSorting: true,
      cellRenderer: this.customCellRendererFunc
    }
  ];

  public group: Group = {
    'name': 'Grupa testowa 1',
    'description': 'Przykładowy opis grupy testowej 1',
    'owner': 'test',
    'key': 'qwerty1234'
  };

  public users = [
    {'login': 'test' },
    {'login': 'user1' },
    {'login': 'user2' }
  ];

  constructor(private route: ActivatedRoute, private groupsService: GroupsService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.groupDetailsSubscription = this.groupService.getGroupDetails(this.id).subscribe(data => { this.group = data; });
    // this.groupUserListSubscription = this.groupService.getUserList(this.id).subscribe(data => {this.users = data});
  }

  customCellRendererFunc() {
      return `<button type="button" data-action-type="edit" class="btn btn-success btn-sm" click="deleteUser(login)">Usuń</button>`;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onGridColumnsChanged(params) {
    params.api.sizeColumnsToFit();
  }

  onGridSizeChanged(params) {
    if (params.clientWidth < 800) {
      this.columnDefs = [
        { headerName: 'Użytkownik', field: 'login', headerTooltip: 'Login użytkownika' },
        {
          headerName: '',
          suppressMenu: true,
          suppressSorting: true,
          cellRenderer: this.customCellRendererFunc
        }
      ];
    } else {
      this.columnDefs = [
        { headerName: 'Użytkownik', field: 'login', headerTooltip: 'Login użytkownika' },
        {
          headerName: '',
          suppressMenu: true,
          suppressSorting: true,
          cellRenderer: this.customCellRendererFunc
        }
      ];
    }

    params.api.sizeColumnsToFit();
  }


  deleteUser(login) {
    this.userDeleteSubscription = this.groupsService.deleteUser(this.id, login).subscribe();
  }
  deleteGroup() {
    this.groupDeleteSubscription = this.groupsService.deleteGroup(this.id).subscribe();
    this.display = false;
  }

  newKeyGenerate() {
    this.newKeyGenerateSubscription = this.groupsService.newKeyGenerate(this.id).subscribe();
  }
  showDialog() {
    this.display = true;
}
  ngOnDestroy() {
    if (this.groupDetailsSubscription) {
      this.groupDetailsSubscription.unsubscribe();
     }
     if (this.groupUserListSubscription) {
      this.groupUserListSubscription.unsubscribe();
     }
     if (this.userDeleteSubscription) {
      this.userDeleteSubscription.unsubscribe();
     }
     if (this.groupDeleteSubscription) {
      this.groupDeleteSubscription.unsubscribe();
     }
     if (this.newKeyGenerateSubscription) {
      this.newKeyGenerateSubscription.unsubscribe();
     }
  }

}
