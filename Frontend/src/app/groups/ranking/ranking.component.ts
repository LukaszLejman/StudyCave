import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Group } from '../group';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService } from '../groups.service';
import { Subscription } from 'rxjs/Subscription';
import { RankingType } from './ranking';
import { GridOptions } from 'ag-grid-community/main';
import * as picasso from 'picasso.js';
picasso.default('canvas');

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit, OnDestroy {

  @ViewChild('chartContainer')
  public elemRef: ElementRef;
  public group: Group;
  public id: number;
  public currentUser: any;
  public typeOfRankingToDisplay: RankingType = RankingType.all;
  private gridApi;
  public gridOptions: GridOptions;
  groupDetailsSubscription: Subscription;
  columnDefs = [
    { headerName: 'Użytkownik', field: 'username', headerTooltip: 'Użytkownik' },
    { headerName: 'Punkty', field: 'points', headerTooltip: 'Punkty' },
  ];
  data = [{ username: 'user1', points: 0 },
  { username: 'user2', points: 1 }];


  constructor(private route: ActivatedRoute, private groupService: GroupsService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.groupDetailsSubscription = this.groupService.getGroupDetails(this.id)
      .subscribe(data => { this.group = data; });
    picasso.default.chart({
      element: this.elemRef.nativeElement, // container must have a width and height specified
      settings: {
        scales: {
          budget: { max: 5000, min: 0 },
          sales: { max: 11000, min: 3000, invert: true }
        },
        components: [
          {
            type: 'axis',
            scale: 'budget',
            dock: 'bottom'
          },
          {
            type: 'axis',
            scale: 'sales',
            dock: 'left'
          },
          {
            type: 'point',
            data: [
              { sales: 7456, margin: 0.3, budget: 4557 },
              { sales: 5603, margin: 0.7, budget: 2234 },
              { sales: 8603, margin: 0.6, budget: 4121 },
              { sales: 4562, margin: 0.4, budget: 1234 },
              { sales: 9873, margin: 0.9, budget: 3453 },
            ],
            settings: {
              x: { scale: 'budget', fn: d => d.scale(d.datum.value.budget) },
              y: { scale: 'sales', fn: d => d.scale(d.datum.value.sales) },
            }
          }
        ]
      }
    });
  }

  ngOnDestroy(): void {
    if (this.groupDetailsSubscription) {
      this.groupDetailsSubscription.unsubscribe();
    }
  }

  showGlobalRanking(): void {
    this.typeOfRankingToDisplay = RankingType.all;
  }

  showOnlyTestsRanking(): void {
    this.typeOfRankingToDisplay = RankingType.test;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onGridColumnsChanged(params) {
    params.api.sizeColumnsToFit();
  }

  onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }

}
