import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from '../groups.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Resource } from '../resource';

@Component({
  selector: 'app-sharing-resources-in-groups',
  templateUrl: './sharing-resources-in-groups.component.html',
  styleUrls: ['./sharing-resources-in-groups.component.css']
})
export class SharingResourcesInGroupsComponent implements OnInit {

  public id = 0;

  public materialsToAdd: Resource[] = [];
  public testsToAdd: Resource[] = [];
  public flashcardsToAdd: Resource[] = [];

  constructor(private route: ActivatedRoute,
    private groupService: GroupsService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
  }

  getMaterialsToAdd() {
    this.groupService.getMaterialsToAdd(this.id).subscribe(
      success => {
        this.testsToAdd = [];
        this.flashcardsToAdd = [];
        console.log('Materials to add: ', success);
        this.materialsToAdd = success;
      },
      error => {
        this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        console.log('Something went wrong :( \nError: ', error);
      }
    );
  }

  getTestsToAdd() {
    this.groupService.getTestsToAdd(this.id).subscribe(
      success => {
        this.flashcardsToAdd = [];
        this.materialsToAdd = [];
        console.log('Tests to add: ', success);
        this.testsToAdd = success;
      },
      error => {
        this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        console.log('Something went wrong :( \nError: ', error);
      }
    );
  }

  getFlashcardsToAdd() {
    this.groupService.getFlashcardsToAdd(this.id).subscribe(
      success => {
        this.materialsToAdd = [];
        this.testsToAdd = [];
        console.log('Flashcards to add: ', success);
        this.flashcardsToAdd = success;
      },
      error => {
        this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        console.log('Something went wrong :( \nError: ', error);
      }
    );
  }

}
