import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GroupsService } from '../groups.service';
import { Group } from '../group';

@Component({
  selector: 'app-group-creator',
  templateUrl: './group-creator.component.html',
  styleUrls: ['./group-creator.component.css']
})
export class GroupCreatorComponent implements OnInit, OnDestroy {

  public currentUser: string;
  public postGroupsSubscription: ISubscription;
  public createdGroup: Group = {};
  public showInfoDialog: boolean;

  @ViewChild('btn') btn: ElementRef;

  constructor(private groupsService: GroupsService, private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.showInfoDialog = false;
    if (localStorage.getItem('currentUser') !== null) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
    }
  }

  add(value: any) {
    this.btn.nativeElement.disabled = true;
    const toSend = {
      name: value.name,
      description: value.description,
      owner: this.currentUser
    };
    console.log('Wysyłana grupa: ', toSend);
    this.postGroupsSubscription = this.groupsService.postGroup(toSend).subscribe(
      success => {
        console.log('Zapisana grupa: ', success);
        this.createdGroup = success;
        this.showInfoDialog = true;
      },
      error => {
        this.btn.nativeElement.disabled = false;
        this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        console.log('Something went wrong :( \nError: ', error);
      }
    );
  }

  goToManageGroup() {
    this.router.navigate(['groups/manage', this.createdGroup.id]);
  }

  ngOnDestroy() {
    if (this.postGroupsSubscription) {
      this.postGroupsSubscription.unsubscribe();
    }
  }

}
