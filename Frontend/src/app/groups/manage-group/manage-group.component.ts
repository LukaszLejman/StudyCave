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
  displayUser = false;

  private gridApi;
  public gridOptions: GridOptions;

  public columnDefs = [
    { headerName: 'Użytkownik', field: 'username', headerTooltip: 'Login użytkownika' },
    {
      headerName: '',
      suppressMenu: true,
      suppressSorting: true,
      cellRenderer: this.customCellRendererFunc
    }
  ];

  public group: Group;


  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private groupsService: GroupsService, private confirmationService: ConfirmationService, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.groupDetailsSubscription = this.groupsService.getGroupDetails(this.id).subscribe(data => { this.group = data; });
  }

  customCellRendererFunc() {
    return `<button type="button" data-action-type="edit" class="btn btn-success btn-sm" click="showUserDialog()">Usuń</button>`;
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
        { headerName: 'Użytkownik', field: 'username', headerTooltip: 'Login użytkownika' },
        {
          headerName: '',
          suppressMenu: true,
          suppressSorting: true,
          cellRenderer: this.customCellRendererFunc
        }
      ];
    } else {
      this.columnDefs = [
        { headerName: 'Użytkownik', field: 'username', headerTooltip: 'Login użytkownika' },
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


  deleteUser(userId) {
    this.userDeleteSubscription = this.groupsService.deleteUser(this.id, userId).subscribe();
  }
  deleteGroup() {
    this.groupDeleteSubscription = this.groupsService.deleteGroup(this.id).subscribe();
    this.display = false;
    this.router.navigate(['/my-groups']);
  }

  newKeyGenerate() {
    this.newKeyGenerateSubscription = this.groupsService.newKeyGenerate(this.id).subscribe();
  }
  showDialog() {
    this.display = true;
  }
  showUserDialog() {
    this.displayUser = true;
  }
  ngOnDestroy() {
    if (this.groupDetailsSubscription) {
      this.groupDetailsSubscription.unsubscribe();
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
