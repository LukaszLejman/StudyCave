import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Group } from '../group';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { GroupsService } from '../groups.service';
import { Subscription } from 'rxjs/Subscription';
import { RankingType } from './ranking';
import { GridOptions } from 'ag-grid-community/main';
import localeText from './../../../assets/localeText';
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
  public groupDetailsSubscription: Subscription;
  public rankingSubscription: Subscription;
  public chart;
  public localeText = localeText;
  public columnDefs = [
    { headerName: 'Użytkownik', field: 'username', headerTooltip: 'Użytkownik' },
    { headerName: 'Punkty', field: 'points', headerTooltip: 'Punkty' },
  ];
  public data;


  constructor(private route: ActivatedRoute, private groupService: GroupsService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.groupDetailsSubscription = this.groupService.getGroupDetails(this.id)
      .subscribe(data2 => {
        this.group = data2;
        this.rankingSubscription = this.groupService.getGlobalRanking(this.group.id).subscribe(data3 => {
          this.data = data3.sort((a, b) => {
            if (a.points > b.points) {
              return -1;
            } else if (a.points < b.points) {
              return 1;
            } else {
              return 0;
            }
          });
          this.showChart();
        });
      });
  }

  ngOnDestroy(): void {
    if (this.groupDetailsSubscription) {
      this.groupDetailsSubscription.unsubscribe();
    }
    if (this.rankingSubscription) {
      this.rankingSubscription.unsubscribe();
    }
  }

  showChart(): void {
    const data: Data = {
      type: 'matrix',
      data: [['username', 'points']]
    };
    this.data.forEach(item => data.data.push([item.username, item.points]));
    this.chart = picasso.default.chart({
      element: this.elemRef.nativeElement,
      data,
      settings: {
        scales: {
          y: {
            data: { field: 'points' },
            invert: true,
            include: [0]
          },
          c: {
            data: { field: 'points' },
            type: 'color'
          },
          t: { data: { extract: { field: 'username' } }, padding: 0.3 },
        },
        components: [{
          type: 'axis',
          dock: 'left',
          scale: 'y'
        }, {
          type: 'axis',
          dock: 'bottom',
          scale: 't'
        }, {
          key: 'bars',
          type: 'box',
          data: {
            extract: {
              field: 'username',
              props: {
                start: 0,
                end: { field: 'points' }
              }
            }
          },
          settings: {
            major: { scale: 't' },
            minor: { scale: 'y' },
            box: {
              fill: function (d) {
                return d.datum.value === JSON.parse(localStorage.getItem('currentUser')).username ? '#cea856' : '#272324';
              },
              stroke: 'transparent'
            }
          }
        }
        ]
      }
    });
  }

  showGlobalRanking(): void {
    this.typeOfRankingToDisplay = RankingType.all;
    this.rankingSubscription = this.groupService.getGlobalRanking(this.group.id).subscribe(data => {
      this.data = data.sort((a, b) => {
        if (a.points > b.points) {
          return -1;
        } else if (a.points < b.points) {
          return 1;
        } else {
          return 0;
        }
      });
      this.showChart();
    });
  }

  showOnlyTestsRanking(): void {
    this.typeOfRankingToDisplay = RankingType.test;
    this.rankingSubscription = this.groupService.getTestsRanking(this.group.id).subscribe(data => {
      this.data = data.sort((a, b) => {
        if (a.points > b.points) {
          return -1;
        } else if (a.points < b.points) {
          return 1;
        } else {
          return 0;
        }
      });
      this.showChart();
    });
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
    if (this.data) {
      this.showChart();
    }
  }

}
