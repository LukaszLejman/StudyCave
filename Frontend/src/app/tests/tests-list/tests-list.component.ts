import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestsService } from '../tests.service';
import { GridOptions, RowDoubleClickedEvent } from 'ag-grid/main';
import localeText from './localeText';

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.css']
})
export class TestsListComponent implements OnInit {
  private tests = [];
  private gridApi;
  private gridColumnApi;
  public gridOptions: GridOptions;
  private localeText = localeText;
  private logged = false;
  private publicMode = true;

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
      template: `
        <button type="button" data-action-type="remove" class="btn btn-danger btn-sm">Usuń</button>
        <button type="button" data-action-type="edit" class="btn btn-success btn-sm">Edytuj</button>
        `}
  ];


  constructor(private router: Router, private testService: TestsService) { }

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
        default:
          return this.goToTest(e);
      }
    }

  }

  public onActionEditClick(e) {
    this.router.navigate(['tests/edit', e.data.id]);
  }

  public onActionRemoveClick(e) {
    this.testService.removeTest(e.data.id).subscribe(
      d => {
        if (this.publicMode) {
          this.getPublicTestsData();
        } else {
          this.showPrivateTests();
        }
      }
    );
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
    this.testService.getUserTests().subscribe(
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
          template: `
        <button type="button" data-action-type="remove" class="btn btn-danger btn-sm">Usuń</button>
        <button type="button" data-action-type="edit" class="btn btn-success btn-sm">Edytuj</button>
        `}
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
          template: `
        <button type="button" data-action-type="remove" class="btn btn-danger btn-sm">Usuń</button>
        <button type="button" data-action-type="edit" class="btn btn-success btn-sm">Edytuj</button>
        `}
      ];
    }

    params.api.sizeColumnsToFit();
  }

  onGidColumnsChanged(params) {
    params.api.sizeColumnsToFit();
  }

}
