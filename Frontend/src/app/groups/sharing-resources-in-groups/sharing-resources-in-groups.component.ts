import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from '../groups.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Resource } from '../resource';
import { SelectItem } from 'primeng/api';
import { ResourceType } from './sharing-resources-in-groups';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sharing-resources-in-groups',
  templateUrl: './sharing-resources-in-groups.component.html',
  styleUrls: ['./sharing-resources-in-groups.component.css']
})
export class SharingResourcesInGroupsComponent implements OnInit, OnDestroy {

  public id = 0;

  public materialsToAdd: Resource[] = [];
  public testsToAdd: Resource[] = [];
  public flashcardsToAdd: Resource[] = [];
  public selectedTypeOfResource: ResourceType;
  public selected: string[];
  private getMaterialsToAddSub: Subscription;
  private getTestsToAddSub: Subscription;
  private getFlashcardsToAddSub: Subscription;
  private addTestsToGroupSub: Subscription;
  private addMaterialsToGroupSub: Subscription;
  private addFlashcardsToGroupSub: Subscription;

  constructor(private route: ActivatedRoute,
    private groupService: GroupsService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
  }

  ngOnDestroy() {
    if (this.getMaterialsToAddSub) {
      this.getMaterialsToAddSub.unsubscribe();
    }
    if (this.getTestsToAddSub) {
      this.getTestsToAddSub.unsubscribe();
    }
    if (this.getFlashcardsToAddSub) {
      this.getFlashcardsToAddSub.unsubscribe();
    }
    if (this.addTestsToGroupSub) {
      this.addTestsToGroupSub.unsubscribe();
    }
    if (this.addMaterialsToGroupSub) {
      this.addMaterialsToGroupSub.unsubscribe();
    }
    if (this.addFlashcardsToGroupSub) {
      this.addFlashcardsToGroupSub.unsubscribe();
    }
  }

  getMaterialsToAdd() {
    this.selectedTypeOfResource = ResourceType.materials;
    this.selected = [];
    this.getMaterialsToAddSub = this.groupService.getMaterialsToAdd(this.id).subscribe(
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
    this.getTestsToAddSub = this.groupService.getTestsToAdd(this.id).subscribe(
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
    this.getFlashcardsToAddSub = this.groupService.getFlashcardsToAdd(this.id).subscribe(
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
    this.selected = [];
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
    if (this.selectedTypeOfResource === ResourceType.test) {
      this.addTestsToGroupSub = this.groupService.addTestsToGroup(this.id, this.selected).subscribe(
        success => {
          this.snackBar.open('Twoje testy zostały dodane do grupy.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
        },
        error => {
          this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        }
      );
    } else if (this.selectedTypeOfResource === ResourceType.flashcards) {
      this.addFlashcardsToGroupSub = this.groupService.addFlashcardsToGroup(this.id, this.selected).subscribe(
        success => {
          this.snackBar.open('Twoje fiszki zostały dodane do grupy.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
        },
        error => {
          this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        }
      );
    } else if (this.selectedTypeOfResource === ResourceType.materials) {
      this.addMaterialsToGroupSub = this.groupService.addMaterialsToGroup(this.id, this.selected).subscribe(
        success => {
          this.snackBar.open('Twoje materiały zostały dodane do grupy.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
        },
        error => {
          this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        }
      );
    } else {
      this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
    }
    this.refreshList();
  }

}
