import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestsService } from '../tests.service';
import { GridOptions, RowDoubleClickedEvent } from 'ag-grid/main';

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

  columnDefs = [
    { headerName: 'Nazwa', field: 'title', headerTooltip: 'Nazwa'},
    { headerName: 'Data dodania', field: 'add_date', headerTooltip: 'Data dodania' },
    { headerName: 'Data modyfikacji', field: 'edit_date', headerTooltip: 'Data modyfikacji' },
    { headerName: 'Właściciel', field: 'owner', headerTooltip: 'Właściciel' }
  ];


  constructor(private router: Router, private testService: TestsService) { }

  ngOnInit() {
    this.gridOptions = {
      
      onRowClicked: this.goToTest.bind(this),
      getRowStyle: function (params) {
        return {
          cursor: 'pointer'
        };
      },
    };
    this.testService.getTests().subscribe(
      d => {
        this.tests = d;
        console.log(d);

      }
    );
  }

  goToTest(event: RowDoubleClickedEvent) {
    console.log(event.data.id);
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
    params.api.sizeColumnsToFit();
  }

}
