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
      .subscribe(data2 => { this.group = data2; });
    const data = {
      type: 'matrix',
      data: [['username', 'points'],
      ['user1', 1],
      ['user2', 50],
      ['user3', 10],
      ['user4', 20],
      ['user5', 30],
      ['user6', 50],
      ['usera1', 10],
      ['usera2', 20],
      ['usera2', 30],
      ['ukasz', 50],
      ['usera4', 50]]
    };
    picasso.default.chart({
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
              fill: function(d) {
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
