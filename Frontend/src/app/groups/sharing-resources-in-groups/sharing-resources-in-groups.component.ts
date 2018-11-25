import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from '../groups.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Resource } from '../resource';
import { SelectItem } from 'primeng/api';
import { ResourceType } from './sharing-resources-in-groups';

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
  public selectedTypeOfResource: ResourceType;
  public selected: string[];

  constructor(private route: ActivatedRoute,
    private groupService: GroupsService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
  }

  getMaterialsToAdd() {
    this.selectedTypeOfResource = ResourceType.materials;
    this.selected = [];
    this.groupService.getMaterialsToAdd(this.id).subscribe(
      success => {
        this.testsToAdd = [];
        this.flashcardsToAdd = [];
        console.log('Materials to add: ', success);
        this.materialsToAdd = success.map(this.addPropertiesToDisplayInMultiselectList);
      },
      error => {
        this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
          { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        console.log('Something went wrong :( \nError: ', error);
      }
    );
  }

  getTestsToAdd() {
    this.selectedTypeOfResource = ResourceType.test;
    this.selected = [];
    this.groupService.getTestsToAdd(this.id).subscribe(
      success => {
        this.flashcardsToAdd = [];
        this.materialsToAdd = [];
        console.log('Tests to add: ', success);
        this.testsToAdd = success.map(this.addPropertiesToDisplayInMultiselectList);
      },
      error => {
        this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
          { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        console.log('Something went wrong :( \nError: ', error);
      }
    );
  }

  getFlashcardsToAdd() {
    this.selectedTypeOfResource = ResourceType.flashcards;
    this.selected = [];
    this.groupService.getFlashcardsToAdd(this.id).subscribe(
      success => {
        this.materialsToAdd = [];
        this.testsToAdd = [];
        console.log('Flashcards to add: ', success);
        this.flashcardsToAdd = success.map(this.addPropertiesToDisplayInMultiselectList);
      },
      error => {
        this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
          { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        console.log('Something went wrong :( \nError: ', error);
      }
    );
  }

  addPropertiesToDisplayInMultiselectList(item) {
    if (item.title) {
      item.label = item.title;
    } else {
      item.label = item.name;
    }
    item.value = item.id;
    return item;
  }

  setResources() {
    if (this.selectedTypeOfResource === ResourceType.test) {
      return this.testsToAdd;
    }
    if (this.selectedTypeOfResource === ResourceType.flashcards) {
      return this.flashcardsToAdd;
    }
    if (this.selectedTypeOfResource === ResourceType.materials) {
      return this.materialsToAdd;
    }
    return {};
  }

  refreshList() {
    if (this.selectedTypeOfResource === ResourceType.test) {
      this.getTestsToAdd();
    }
    if (this.selectedTypeOfResource === ResourceType.flashcards) {
      this.getFlashcardsToAdd();
    }
    if (this.selectedTypeOfResource === ResourceType.materials) {
      this.getMaterialsToAdd();
    }
  }

  addResources() {
    this.id = this.route.snapshot.params.id;
    console.log(this.selected, this.id);
    this.snackBar.open('Twoje materiały zostały dodane.', null,
      { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
    this.refreshList();
    // TODO: polaczenie z backendem
  }

}
