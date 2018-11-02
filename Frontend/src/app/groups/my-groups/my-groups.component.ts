import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridOptions, RowDoubleClickedEvent } from 'ag-grid/main';
import { ISubscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import localeText from './localeText';

import { Group } from '../group';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.css']
})
export class MyGroupsComponent implements OnInit, OnDestroy {

  public groups: Group[] = [];

  private gridApi;
  public gridOptions: GridOptions;
  public localeText = localeText;

  public columnDefs = [
    { headerName: 'Nazwa', field: 'name', headerTooltip: 'Nazwa' },
    { headerName: 'Rola', field: 'role', headerTooltip: 'Rola', hide: false },
    {
      headerName: '',
      suppressMenu: true,
      suppressSorting: true,
      cellRenderer: this.customCellRendererFunc
    }
  ];

  private getGroupsSubscription: ISubscription;

  constructor(private groupsService: GroupsService, private router: Router) { }

  ngOnInit() {
    this.getGroupsSubscription = this.groupsService.getGroups().subscribe(
      success => {
        console.log('Grupy użytkownika: ', success);
        this.groups = success['groups']; // to check later when back-end will be ready
        this.gridOptions = {
          rowHeight: 50,
          headerHeight: 25,
          getRowStyle: function (params) {
            return {
              cursor: 'pointer'
            };
          },
        };
      },
      error => {
        console.log('Something went wrong :( \nError: ', error);
      }
    );
  }

  toGroupMaker() {
    this.router.navigate(['create-group']);
  }

  goToGroup(event: RowDoubleClickedEvent) {
    this.router.navigate(['groups', event.data.id]); // to check later
  }

  onActionManageClick(e) {
    this.router.navigate(['groups/manage', e.data.id]); // to check later
  }

  onRowClicked(e) {
    if (e.event.target !== undefined) {
      const actionType = e.event.target.getAttribute('data-action-type');

      switch (actionType) {
        case 'edit':
          return this.onActionManageClick(e);
        default:
          return this.goToGroup(e);
      }
    }
  }

  customCellRendererFunc(params) {
    if (params.data['role'] === 'OWNER') {
      return `
        <button type="button" data-action-type="edit" class="btn btn-success btn-sm">Zarządzaj</button>
        `;
    } else {
      return '';
    }
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
        { headerName: 'Nazwa', field: 'name', headerTooltip: 'Nazwa' },
        { headerName: 'Rola', field: 'role', headerTooltip: 'Rola', hide: true },
        {
          headerName: '',
          suppressMenu: true,
          suppressSorting: true,
          cellRenderer: this.customCellRendererFunc
        }
      ];
    } else {
      this.columnDefs = [
        { headerName: 'Nazwa', field: 'name', headerTooltip: 'Nazwa' },
        { headerName: 'Rola', field: 'role', headerTooltip: 'Rola', hide: false },
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

  ngOnDestroy() {
    if (this.getGroupsSubscription) {
      this.getGroupsSubscription.unsubscribe();
    }
  }

}
