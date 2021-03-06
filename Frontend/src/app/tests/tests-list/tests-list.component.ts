import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TestsService } from '../tests.service';
import { GridOptions, RowDoubleClickedEvent } from 'ag-grid-community/main';
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
  display = false;
  isGroup = false;
  toDelete;
  columnDefs = [
    { headerName: 'Nazwa', field: 'title', headerTooltip: 'Nazwa' },
    { headerName: 'Data dodania', field: 'addDate', headerTooltip: 'Data dodania', hide: false },
    { headerName: 'Data modyfikacji', field: 'editDate', headerTooltip: 'Data modyfikacji', hide: false },
    { headerName: 'Właściciel', field: 'owner', headerTooltip: 'Właściciel', hide: false },
    { headerName: 'Grupa', field: 'group', headerTooltip: 'Grupa', hide: !this.isGroup },
    { headerName: 'Ocena', field: 'grade', headerTooltip: 'Ocena', hide: false },
    {
      headerName: '',
      suppressMenu: true,
      suppressSorting: true,
      cellRenderer: this.customCellRendererFunc,
      hide: !this.isGroup
    }
  ];


  constructor(private router: Router, private testService: TestsService) { }

  customCellRendererFunc(params) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      return '<button type="button" data-action-type="get" class="btn btn-study-cave">PDF</button>';
    } else if (params.data['owner'] === currentUser.username) {
      return `
        <button type="button" data-action-type="remove" class="btn btn-study-cave btn-sm" title="Usuń">
        <i class="fas fa-trash-alt" data-action-type="remove"></i></button>
        <button type="button" data-action-type="edit" class="btn btn-study-cave btn-sm" title="Edytuj">
        <i class="fas fa-edit" data-action-type="edit"></i></button>
        <button type="button" data-action-type="get" class="btn btn-study-cave btn-sm" title="PDF">
        <i class="fas fa-file-pdf" data-action-type="get"></i></button>
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

  openPopup() {
    this.display = true;
  }

  deleteTest() {
    this.display = false;
    this.removeTestSubscription = this.testService.removeTest(this.toDelete).subscribe(
      d => {
        if (this.publicMode) {
          this.getPublicTestsData();
        } else {
          this.showPrivateTests();
        }
      }
    );
  }

  public onActionRemoveClick(e) {
    this.openPopup();
    this.toDelete = e.data.id;
  }

  getPDF(test: Test) {
    const pdf = new Test2PDF();
    pdf.getPDF(test);
  }

  getPublicTestsData() {
    this.publicMode = true;
    this.isGroup = false;
    this.testService.getTests().subscribe(
      d => {
        this.tests = d;
        this.refreshColumns();
      }
    );
  }

  showPrivateTests() {
    this.publicMode = false;
    this.isGroup = true;
    this.getTestsSubscription = this.getUserTestsSubscription = this.testService.getUserTests().subscribe(
      d => {
        d.forEach((x, i) => {
          if (!x['group']) {
            x['group'] = 'Brak';
          }
        });
        this.tests = d;
        this.refreshColumns();
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
        { headerName: 'Grupa', field: 'group', headerTooltip: 'Grupa', hide: !this.isGroup },
        { headerName: 'Ocena', field: 'grade', headerTooltip: 'Ocena', hide: true },
        {
          headerName: '',
          suppressMenu: true,
          suppressSorting: true,
          cellRenderer: this.customCellRendererFunc,
          hide: !this.isGroup
        }
      ];
    } else {
      this.columnDefs = [
        { headerName: 'Nazwa', field: 'title', headerTooltip: 'Nazwa' },
        { headerName: 'Data dodania', field: 'addDate', headerTooltip: 'Data dodania', hide: false },
        { headerName: 'Data modyfikacji', field: 'editDate', headerTooltip: 'Data modyfikacji', hide: false },
        { headerName: 'Właściciel', field: 'owner', headerTooltip: 'Właściciel', hide: false },
        { headerName: 'Grupa', field: 'group', headerTooltip: 'Grupa', hide: !this.isGroup },
        { headerName: 'Ocena', field: 'grade', headerTooltip: 'Ocena', hide: false },
        {
          headerName: '',
          suppressMenu: true,
          suppressSorting: true,
          cellRenderer: this.customCellRendererFunc,
          hide: !this.isGroup
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

  refreshColumns() {
    this.columnDefs = [
      { headerName: 'Nazwa', field: 'title', headerTooltip: 'Nazwa' },
      { headerName: 'Data dodania', field: 'addDate', headerTooltip: 'Data dodania', hide: false },
      { headerName: 'Data modyfikacji', field: 'editDate', headerTooltip: 'Data modyfikacji', hide: false },
      { headerName: 'Właściciel', field: 'owner', headerTooltip: 'Właściciel', hide: false },
      { headerName: 'Grupa', field: 'group', headerTooltip: 'Grupa', hide: !this.isGroup },
      { headerName: 'Ocena', field: 'grade', headerTooltip: 'Ocena', hide: false },
      {
        headerName: '',
        suppressMenu: true,
        suppressSorting: true,
        cellRenderer: this.customCellRendererFunc,
        hide: !this.isGroup
      }
    ];
  }

}
