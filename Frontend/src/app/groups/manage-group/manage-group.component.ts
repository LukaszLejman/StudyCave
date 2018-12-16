import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService } from '../groups.service';
import { Subscription } from 'rxjs/Subscription';
import { Group, UsersConfig } from '../group';
import { GridOptions, RowDoubleClickedEvent } from 'ag-grid-community/main';
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

  customCellRendererFunc(params) {
    return `<button type="button" data-action-type="remove" class="btn btn-study-cave btn-sm" >Usuń</button>`;
  }


  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.groupDetailsSubscription = this.groupsService.getGroupDetails(this.id).subscribe(data => { this.group = data; });

    this.gridOptions = {
      rowHeight: 50,
      headerHeight: 25,
      getRowStyle: function (params) {
        return {
          cursor: 'pointer'
        };
      },
    };
   }


  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const data = e.data;
      const actionType = e.event.target.getAttribute('data-action-type');

      switch (actionType) {
        case 'remove':
          return this.onActionRemoveClick(e);
      }
    }
  }
  redirectTo(uri) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri]));
  }

  public onActionRemoveClick(e) {
    this.userDeleteSubscription = this.groupsService.deleteUser(this.id, e.data.id).subscribe();
    setTimeout(() => {
      this.redirectTo('/groups/manage/' + this.id);
    }, 200);
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
  onGidColumnsChanged(params) {
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

  showWaitingResources() {
    this.router.navigate(['/groups/waiting-resources/', this.id]);
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
