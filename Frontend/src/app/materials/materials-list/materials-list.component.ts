import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MaterialsService } from '../materials.service';
import { GridOptions, RowDoubleClickedEvent } from 'ag-grid-community/main';
import localeText from './localeText';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.css']
})
export class MaterialsListComponent implements OnInit, OnDestroy {

  mats = [];
  matsPrivate = [];
  matsEmpty = true;
  selectedMat: any;
  matSubscription: Subscription;
  materialsSubscription: Subscription;
  materialsSubscriptionOwners: Subscription;
  ShowStatus: Boolean = false;
  user: Boolean = false;
  private gridApi;
  private gridColumnApi;
  public gridOptions: GridOptions;
  private localeText = localeText;
  private logged = false;
  private publicMode = true;
  private permission;
  // serverURL = 'http://studycave-api.eu-west-1.elasticbeanstalk.com/file/files/' ; // działa na globalu
  // serverURL = 'http://localhost:8080/file/files/' ; // działa na localhost

  columnDefs = [
    { headerName: 'Nazwa', field: 'title', headerTooltip: 'Nazwa' },
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

  constructor(private materialsService: MaterialsService, private router: Router, public snackBar: MatSnackBar) { }

  customCellRendererFunc(params) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      return '';
    } else if (params.data['owner'] === currentUser.username) {
      return `
        <button type="button" data-action-type="remove" class="btn btn-study-cave btn-sm" title="Usuń">
        <i class="fas fa-trash-alt" data-action-type="remove"></i></button>
        <button type="button" data-action-type="changePermission" class="btn btn-study-cave btn-sm" title="Uprawnienia">
        <i class="fas fa-unlock" data-action-type="changePermission"></i></button>
        `;
    } else {
      return '';
    }
  }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.logged = true;
    }

    this.gridOptions = {
      rowHeight: 50,
      headerHeight: 25,
      getRowStyle: function (params) {
        return {
          cursor: 'pointer'
        };
      },
    };
    this.getMats();
    this.IsLogin();
  }


  toMaterialsMaker() {
    this.router.navigate(['materials/add-materials']);
  }

  IsLogin() {
    if (localStorage.getItem('currentUser')) {
      this.user = true;
    } else {
      this.user = false;
    }
  }
  ShowPublic() {
    this.ShowStatus = false;
    this.getMats();
  }
  ShowPrivate() {
    this.ShowStatus = true;
    this.getMatsOwners();
  }

  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const data = e.data;
      const actionType = e.event.target.getAttribute('data-action-type');

      switch (actionType) {
        case 'remove':
          return this.onActionRemoveClick(e);
        case 'changePermission':
          return this.changePermission(e);
        case 'download':
          return this.download(e);
        default:
          return this.goToMats(e);
      }
    }

  }
  public onActionRemoveClick(e) {
    this.matSubscription = this.materialsService.deleteMat(e.data.id);

  }

  download(e) {
    this.materialsService.downloadFile(e.data.id);
    // console.log('download');
  }

  changePermission(e): void {
    if (e.data.permission === 'Public') {
      this.permission = 'Private';
    } else {
      this.permission = 'Public';
    }
    this.materialsService.changeMatPermission(e.data.id, this.permission);
    this.snackBar.open('Zmieniono pozwolenie na: ' + this.permission, null,
      { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
    this.router.navigate(['materials/list']);
  }

  goToMats(e) {
    this.materialsService.setOwner(e.data.owner);
    this.materialsService.setTitle(e.data.title);
    this.materialsService.setPerm(e.data.permission);
    this.router.navigate(['materials/', e.data.id]);
  }


  onSelect(mat: any): void {
    this.selectedMat = mat;
    this.materialsService.setOwner(this.selectedMat.owner);
    this.materialsService.setTitle(this.selectedMat.title);
    this.materialsService.setPerm(this.selectedMat.permission);
    this.router.navigate(['materials/', this.selectedMat.id]);
  }

  getMats(): void {
    this.materialsSubscription = this.materialsService.getMaterials()
      .subscribe(data => {
        this.mats = data;
        if (this.mats.length > 0) {
          this.matsEmpty = false;
        } else {
          this.matsEmpty = true;
        }
      });
  }
  getMatsOwners(): void {
    this.materialsSubscriptionOwners = this.materialsService.getMaterialsOwners()
      .subscribe(data => {
        this.mats = [];
        this.mats = data;
        if (this.mats.length > 0) {
          this.matsEmpty = false;
        } else {
          this.matsEmpty = true;
        }
      });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  onGridSizeChanged(params) {
    if (params.clientWidth < 800) {
      this.columnDefs = [
        { headerName: 'Nazwa', field: 'title', headerTooltip: 'Nazwa' },
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
        { headerName: 'Nazwa', field: 'title', headerTooltip: 'Nazwa' },
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
    if (this.materialsSubscription) {
      this.materialsSubscription.unsubscribe();
    }
    if (this.materialsSubscriptionOwners) {
      this.materialsSubscriptionOwners.unsubscribe();
    }
    if (this.matSubscription) {
      this.matSubscription.unsubscribe();
    }
  }

}
