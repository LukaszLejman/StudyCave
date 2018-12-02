import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService } from '../groups.service';
import { Group } from '../group';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from 'ag-grid';


@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit, OnDestroy {
  id: number;
  currentUser;
  dataToDisplay = '';
  public group: Group;
  data;
  display = false;

  groupDetailsSubscription: Subscription;
  resourceDeleteSubscription: Subscription;

  private gridApi;
  public gridOptions: GridOptions;

  mockFlashcards = [
    {
      name: 'flash1',
      add_date: '18-06-2011',
      edit_date: '18-08-2011',
      owner: 'mockOwner',
      grade: 0
    },
    {
      name: 'flash2',
      add_date: '18-06-2011',
      edit_date: '18-08-2011',
      owner: 'mockOwner',
      grade: 0
    }
  ];
  mockTests = [
    {
      name: 'test1',
      add_date: '18-06-2011',
      edit_date: '18-08-2011',
      owner: 'mockOwner',
      grade: 0
    },
    {
      name: 'test2',
      add_date: '18-06-2011',
      edit_date: '18-08-2011',
      owner: 'mockOwner',
      grade: 0
    }
  ];
  mockMaterials = [
    {
      name: 'mat1',
      add_date: '18-06-2011',
      edit_date: '18-08-2011',
      owner: 'mockOwner',
      grade: 0
    },
    {
      name: 'mat2',
      add_date: '18-06-2011',
      edit_date: '18-08-2011',
      owner: 'mockOwner',
      grade: 0
    }
  ];

  columnDefs = [
    { headerName: 'Nazwa', field: 'name', headerTooltip: 'Nazwa' },
    { headerName: 'Data dodania', field: 'add_date', headerTooltip: 'Data dodania', hide: false },
    { headerName: 'Data modyfikacji', field: 'edit_date', headerTooltip: 'Data modyfikacji', hide: false },
    { headerName: 'Właściciel', field: 'owner', headerTooltip: 'Właściciel', hide: false },
    { headerName: 'Ocena', field: 'grade', headerTooltip: 'Ocena', hide: false },
    {
      headerName: '',
      suppressMenu: true,
      suppressSorting: true,
      cellRenderer: this.customCellRendererFunc
    }
  ];

  constructor(private route: ActivatedRoute, private groupService: GroupsService, private router: Router) { }


  customCellRendererFunc(params) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.username === currentUser.username) { // TODO: change if statement after backend upgrades response
      return `<button type="button" data-action-type="remove" class="btn btn-danger btn-sm" >Usuń</button>`;
    } else {
      return '';
    }
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.groupDetailsSubscription = this.groupService.getGroupDetails(this.id)
    .subscribe(data => { this.group = data; });

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
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  public onActionRemoveClick(e) {
    this.display = true;
  }

  deleteResource() {
    setTimeout(() => {
    // his.resourceDeleteSubscription = this.groupService.deleteResource(this.id, e.data.id).subscribe();
    this.display = false;
    this.gridApi.refreshCells();
    // this.redirectTo('/groups/' + this.id);
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
        { headerName: 'Nazwa', field: 'name', headerTooltip: 'Nazwa' },
        { headerName: 'Data dodania', field: 'add_date', headerTooltip: 'Data dodania', hide: true },
        { headerName: 'Data modyfikacji', field: 'edit_date', headerTooltip: 'Data modyfikacji', hide: true },
        { headerName: 'Właściciel', field: 'owner', headerTooltip: 'Właściciel', hide: true },
        { headerName: 'Ocena', field: 'grade', headerTooltip: 'Ocena', hide: true },
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
        { headerName: 'Data dodania', field: 'add_date', headerTooltip: 'Data dodania', hide: false },
        { headerName: 'Data modyfikacji', field: 'edit_date', headerTooltip: 'Data modyfikacji', hide: false },
        { headerName: 'Właściciel', field: 'owner', headerTooltip: 'Właściciel', hide: false },
        { headerName: 'Ocena', field: 'grade', headerTooltip: 'Ocena', hide: false },
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

  ngOnDestroy() {
    if (this.groupDetailsSubscription) {
      this.groupDetailsSubscription.unsubscribe();
    }
    localStorage.removeItem('owner');
  }

  goToEditing() {
    this.router.navigate(['groups/manage', this.id]);
  }

  isDisplayed(resource) {
    if (resource === 'fiszek') {
      setTimeout(() => {
        this.dataToDisplay = resource;
        this.data = this.mockFlashcards;
      }, 200);

    }
    if (resource === 'materiałów') {
      setTimeout(() => {
        this.dataToDisplay = resource;
        this.data = this.mockMaterials;
      }, 200);

    }
    if (resource === 'testów') {
      setTimeout(() => {
        this.dataToDisplay = resource;
        this.data = this.mockTests;
      }, 200);

    }
  }


}
