import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from '../groups.service';
import { ActivityHistory } from '../group';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-history-of-activity-in-group',
  templateUrl: './history-of-activity-in-group.component.html',
  styleUrls: ['./history-of-activity-in-group.component.css']
})
export class HistoryOfActivityInGroupComponent implements OnInit {

  public sort = 'DESC';
  public dateStart = new FormControl(new Date());
  public dateEnd = new FormControl(new Date());
  public maxDate = new Date();

  public id = 0;

  public activityHistory: ActivityHistory[] = [];

  constructor(private route: ActivatedRoute,
    private groupsService: GroupsService,
    public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getHistory(true);
  }

  getHistory(all = false) {
    let dateStart = this.dateStart.value;
    let dateEnd = this.dateEnd.value;
    if (all) {
      dateStart = null;
      dateEnd = null;
    }
    this.groupsService.getActivityHistory(this.id, this.sort, dateStart, dateEnd).subscribe(
      success => {
        this.activityHistory = success;
      },
      error => {
        this.snackBar.open('Coś poszło nie tak. Spróbuj ponownie później.', null,
          { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        console.log(error);
      }
    );
  }

}
