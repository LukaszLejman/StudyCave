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
  flashcardsSusbscritpion: Subscription;
  materialsSubscription: Subscription;
  testsSubscription: Subscription;

  private gridApi;
  public gridOptions: GridOptions;


  columnDefs = [
    { headerName: 'ID', field: 'id', headerTooltip: 'ID' },
    { headerName: 'Nazwa', field: 'title', headerTooltip: 'Nazwa' },
    { headerName: 'Data dodania', field: 'addDate', headerTooltip: 'Data dodania', hide: false },
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
    if (currentUser.username === currentUser.username) {  // TODO: FIX AFTER BACKEND ADDS OWNER TO GROUPINFO
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
    // this.resourceDeleteSubscription = this.groupService.deleteResource(this.id, e.data.id).subscribe();
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
        { headerName: 'ID', field: 'id', headerTooltip: 'ID' },
        { headerName: 'Nazwa', field: 'title', headerTooltip: 'Nazwa' },
        { headerName: 'Data dodania', field: 'addDate', headerTooltip: 'Data dodania', hide: false },
        { headerName: 'Właściciel', field: 'owner', headerTooltip: 'Właściciel', hide: false },
        { headerName: 'Ocena', field: 'grade', headerTooltip: 'Ocena', hide: false },
        {
          headerName: '',
          suppressMenu: true,
          suppressSorting: true,
          cellRenderer: this.customCellRendererFunc
        }
      ];
    } else {
      this.columnDefs = [
        { headerName: 'ID', field: 'id', headerTooltip: 'ID' },
        { headerName: 'Nazwa', field: 'title', headerTooltip: 'Nazwa' },
        { headerName: 'Data dodania', field: 'addDate', headerTooltip: 'Data dodania', hide: false },
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

    if ( this.flashcardsSusbscritpion) {
      this.flashcardsSusbscritpion.unsubscribe();
    }
    if ( this.materialsSubscription) {
      this.materialsSubscription.unsubscribe();
    }
    if ( this.testsSubscription) {
      this.testsSubscription.unsubscribe();
    }
  }

  goToEditing() {
    this.router.navigate(['groups/manage', this.id]);
  }

  isDisplayed(resource) {
    if (resource === 'fiszek') {
      setTimeout(() => {
        this.flashcardsSusbscritpion = this.groupService.getResource(this.id, 'flashcardsets').subscribe(data => this.data = data);
        this.dataToDisplay = resource;
      }, 200);

    }
    if (resource === 'materiałów') {
      setTimeout(() => {
        this.materialsSubscription = this.groupService.getResource(this.id, 'materials').subscribe(data => this.data = data);
        this.dataToDisplay = resource;
        console.log(this.data);
      }, 200);

    }
    if (resource === 'testów') {
      setTimeout(() => {
        this.testsSubscription = this.groupService.getResource(this.id, 'tests').subscribe(data => this.data = data);
        this.dataToDisplay = resource;
      }, 200);

    }
  }


}
