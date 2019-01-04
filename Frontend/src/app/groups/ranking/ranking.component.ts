import { Component, OnInit, OnDestroy } from '@angular/core';
import { Group } from '../group';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService } from '../groups.service';
import { Subscription } from 'rxjs/Subscription';
import { RankingType } from './ranking';
import { GridOptions } from 'ag-grid-community/main';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit, OnDestroy {

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
