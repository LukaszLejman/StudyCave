import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { Set } from '../set';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FilterPipe } from '../../filter.pipe';
import { GridOptions, RowDoubleClickedEvent } from 'ag-grid/main';
import localeText from './localeText';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-flashcards-sets-list',
  templateUrl: './flashcards-sets-list.component.html',
  styleUrls: ['./flashcards-sets-list.component.css']
})
export class FlashcardsSetsListComponent implements OnInit, OnDestroy {

  sets = [];
  privatesets = [];
  setsEmpty = true;
  selectedSet: Set;
  flashcardSubscription: Subscription;
  flashcardSubscriptionOwners: Subscription;
  user: Boolean;
  ShowStatus: Boolean = false;
  owner;
  searchPublic = 'Public';
  searchOwner;
  private gridApi;
  private gridColumnApi;
  public gridOptions: GridOptions;
  private localeText = localeText;
  private logged = false;
  private publicMode = true;
  private permission;

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
  constructor(private flashcardsService: FlashcardsService, private router: Router, public snackBar: MatSnackBar) { }

  customCellRendererFunc(params) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      return '';
    } else if (params.data['owner'] === currentUser.username) {
      return `
        <button type="button" data-action-type="remove" class="btn btn-study-cave btn-sm">Usuń</button>
        <button type="button" data-action-type="changePermission" class="btn btn-study-cave btn-sm">Upraw.</button>
        `;
    } else {
      return '';
    }
  }

  onSelect(set: Set): void {
    this.selectedSet = set;
    this.router.navigate(['flashcards/sets', this.selectedSet.id]);
    this.flashcardsService.setOwner(this.selectedSet.owner);
  }

  toFlashcardsMaker() {
    this.router.navigate(['flashcards/add']);
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
        default:
          return this.goToSets(e);
      }
    }
  }
  public onActionRemoveClick(e) {
    this.flashcardSubscription = this.flashcardsService.deleteSet(e.data.id);
  }
  changePermission(e): void {
    if (e.data.permission === 'Public') {
      this.permission = 'Private';
    } else {
      this.permission = 'Public';
    }
    this.flashcardsService.changeSetPermission(e.data.id, this.permission);
    this.snackBar.open('Zmieniono pozwolenie na: ' + this.permission, null,
      { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
  }

  goToSets(e) {
    this.router.navigate(['flashcards/sets', e.data.id]);
    this.flashcardsService.setOwner(e.data.owner);
  }

  IsLogin() {
    const own = JSON.parse(localStorage.getItem('currentUser'));
    if (localStorage.getItem('currentUser')) {
      this.user = true;
      this.searchOwner = own.username;
    } else {
      this.user = false;
      this.searchOwner = ' ';
    }
  }
  ShowPublic() {
    this.sets = [];
    this.ShowStatus = false;
    this.getSets();
  }
  ShowPrivate() {
    this.privatesets = [];
    this.ShowStatus = true;
    this.getSetsOwners();
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
    this.getSets();
    this.IsLogin();
  }

  getSets(): void {
    this.flashcardSubscription = this.flashcardsService.getSets()
      .subscribe(data => {
        this.sets = data;
        if (this.sets.length > 0) {
          this.setsEmpty = false;
        } else {
          this.setsEmpty = true;
        }
      });
  }
  getSetsOwners(): void {
    this.flashcardSubscriptionOwners = this.flashcardsService.getSetsOwners()
      .subscribe(data => {
        this.sets = data;
        if (this.sets.length > 0) {
          this.setsEmpty = false;
        } else {
          this.setsEmpty = true;
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
    if (this.flashcardSubscription) {
      this.flashcardSubscription.unsubscribe();
    }
    if (this.flashcardSubscriptionOwners) {
      this.flashcardSubscriptionOwners.unsubscribe();
    }
  }
}
