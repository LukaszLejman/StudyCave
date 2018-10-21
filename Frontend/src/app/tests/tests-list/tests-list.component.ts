import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TestsService } from '../tests.service';
import { GridOptions, RowDoubleClickedEvent } from 'ag-grid/main';
import localeText from './localeText';
import { ISubscription } from 'rxjs/Subscription';
import { Test2PDF } from '../test2PDF';
import { Test } from '../test_model';

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.css']
})
export class TestsListComponent implements OnInit, OnDestroy {
  private tests = [];
  private gridApi;
  private gridColumnApi;
  public gridOptions: GridOptions;
  private localeText = localeText;
  private logged = false;
  private publicMode = true;
  private getTestsSubscription: ISubscription;
  private removeTestSubscription: ISubscription;
  private getUserTestsSubscription: ISubscription;
  private currentUser = JSON.parse(localStorage.getItem('currentUser'));

  columnDefs = [
    { headerName: 'Nazwa', field: 'title', headerTooltip: 'Nazwa' },
    { headerName: 'Data dodania', field: 'addDate', headerTooltip: 'Data dodania', hide: false },
    { headerName: 'Data modyfikacji', field: 'editDate', headerTooltip: 'Data modyfikacji', hide: false },
    { headerName: 'Właściciel', field: 'owner', headerTooltip: 'Właściciel', hide: false },
    { headerName: 'Ocena', field: 'grade', headerTooltip: 'Ocena', hide: false },
    {
      headerName: '',
      suppressMenu: true,
      suppressSorting: true,
      cellRenderer: this.customCellRendererFunc
    }
  ];


  constructor(private router: Router, private testService: TestsService) { }

  customCellRendererFunc(params) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      return '<button type="button" data-action-type="get" class="btn btn-primary btn-sm">Pobierz PDF</button>';
    } else if (params.data['owner'] === currentUser.username) {
      return `
        <button type="button" data-action-type="remove" class="btn btn-danger btn-sm">Usuń</button>
        <button type="button" data-action-type="edit" class="btn btn-success btn-sm">Edytuj</button>
        <button type="button" data-action-type="get" class="btn btn-primary btn-sm">Pobierz PDF</button>
        `;
    } else {
      return '';
    }
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
    this.getPublicTestsData();
  }

  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      const data = e.data;
      const actionType = e.event.target.getAttribute('data-action-type');

      switch (actionType) {
        case 'edit':
          return this.onActionEditClick(e);
        case 'remove':
          return this.onActionRemoveClick(e);
        case 'get':
          return this.onActionGetClick(e);
        default:
          return this.goToTest(e);
      }
    }

  }

  public onActionGetClick(e) {
    this.testService.getTest(e.data.id).subscribe(
      success => {
        success.body = this.sortArrayByProperty(success.body, 'nr');
        this.getPDF(success);
      },
      error => {
        console.log(error);
      }
    );
  }

  public sortArrayByProperty(array: Object[], property: string): Object[] {
    return array.sort(function(a, b) {
      if (a[property] < b[property]) {
        return -1;
      }
      if (a[property] > b[property]) {
        return 1;
      }
      return 0;
    });
  }

  public onActionEditClick(e) {
    this.router.navigate(['tests/edit', e.data.id]);
  }

  public onActionRemoveClick(e) {
    this.removeTestSubscription = this.testService.removeTest(e.data.id).subscribe(
      d => {
        if (this.publicMode) {
          this.getPublicTestsData();
        } else {
          this.showPrivateTests();
        }
      }
    );
  }

  getPDF(test: Test) {
    const pdf = new Test2PDF();
    pdf.getPDF(test);
  }

  getPublicTestsData() {
    this.publicMode = true;
    this.testService.getTests().subscribe(
      d => {
        this.tests = d;
      }
    );
  }

  showPrivateTests() {
    this.publicMode = false;
    this.getTestsSubscription = this.getUserTestsSubscription = this.testService.getUserTests().subscribe(
      d => {
        this.tests = d;
        this.gridApi.sizeColumnsToFit();
      }
    );
  }

  goToTest(event: RowDoubleClickedEvent) {
    this.router.navigate(['tests', event.data.id]);
  }

  toTestMaker() {
    this.router.navigate(['test-maker']);
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
        { headerName: 'Data dodania', field: 'addDate', headerTooltip: 'Data dodania', hide: true },
        { headerName: 'Data modyfikacji', field: 'editDate', headerTooltip: 'Data modyfikacji', hide: true },
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
        { headerName: 'Data dodania', field: 'addDate', headerTooltip: 'Data dodania', hide: false },
        { headerName: 'Data modyfikacji', field: 'editDate', headerTooltip: 'Data modyfikacji', hide: false },
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
    if (this.removeTestSubscription) {
      this.removeTestSubscription.unsubscribe();
    }
    if (this.getTestsSubscription) {
      this.getTestsSubscription.unsubscribe();
    }
    if (this.getUserTestsSubscription) {
      this.getUserTestsSubscription.unsubscribe();
    }
  }

}
