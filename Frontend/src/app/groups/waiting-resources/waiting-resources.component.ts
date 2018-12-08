import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from '../groups.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Resource } from '../resource';
import { ResourceType } from '../sharing-resources-in-groups/sharing-resources-in-groups';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-waiting-resources',
  templateUrl: './waiting-resources.component.html',
  styleUrls: ['./waiting-resources.component.css']
})
export class WaitingResourcesComponent implements OnInit, OnDestroy {

  public id = 0;

  public waitingMaterials: Resource[] = [];
  public waitingTests: Resource[] = [];
  public waitingFlashcards: Resource[] = [];

  public selectedTypeOfResource: ResourceType;
  public selected: string[];

  private getWaitingMaterialsSub: Subscription;
  private getWaitingTestsSub: Subscription;
  private getWaitingFlashcardsSub: Subscription;

  private confirmTestSub: Subscription;
  private confirmMaterialSub: Subscription;
  private confirmFlashcardsSub: Subscription;

  constructor(private route: ActivatedRoute,
    private groupService: GroupsService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
  }

  getWaitingMaterials() {
    this.selectedTypeOfResource = ResourceType.materials;
    this.selected = [];
    this.getWaitingMaterialsSub = this.groupService.getMaterialsInGroup(this.id).subscribe(
      success => {
        this.waitingTests = [];
        this.waitingFlashcards = [];
        console.log('Materials to add: ', success);
        this.waitingMaterials = success.map(this.addPropertiesToDisplayInMultiselectList);
      },
      error => {
        this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
          { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        console.log('Something went wrong :( \nError: ', error);
      }
    );
  }

  getWaitingTests() {
    this.selectedTypeOfResource = ResourceType.test;
    this.selected = [];
    this.getWaitingTestsSub = this.groupService.getTestsInGroup(this.id).subscribe(
      success => {
        this.waitingFlashcards = [];
        this.waitingMaterials = [];
        console.log('Tests to add: ', success);
        this.waitingTests = success.map(this.addPropertiesToDisplayInMultiselectList);
      },
      error => {
        this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
          { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        console.log('Something went wrong :( \nError: ', error);
      }
    );
  }

  getWaitingFlashcards() {
    this.selectedTypeOfResource = ResourceType.flashcards;
    this.selected = [];
    this.getWaitingFlashcardsSub = this.groupService.getFlashcardsInGroup(this.id).subscribe(
      success => {
        this.waitingMaterials = [];
        this.waitingTests = [];
        console.log('Flashcards to add: ', success);
        this.waitingFlashcards = success.map(this.addPropertiesToDisplayInMultiselectList);
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

  /*setResources() {
    if (this.selectedTypeOfResource === ResourceType.test) {
      return this.waitingTests;
    }
    if (this.selectedTypeOfResource === ResourceType.flashcards) {
      return this.waitingFlashcards;
    }
    if (this.selectedTypeOfResource === ResourceType.materials) {
      return this.waitingMaterials;
    }
    return {};
  }*/

  refreshList() {
    this.selected = [];
    if (this.selectedTypeOfResource === ResourceType.test) {
      this.getWaitingTests();
    }
    if (this.selectedTypeOfResource === ResourceType.flashcards) {
      this.getWaitingFlashcards();
    }
    if (this.selectedTypeOfResource === ResourceType.materials) {
      this.getWaitingMaterials();
    }
  }

  showResource(resource: Resource) {
    if (this.selectedTypeOfResource === ResourceType.test) {
      // pobierz test
      // pokaz dialog z testem w trybie tylko do odczytu
    } else if (this.selectedTypeOfResource === ResourceType.flashcards) {
      // pobierz fiszki
      // pokaz dialog z fiszkami w trybie tylko do odczytu
    } else if (this.selectedTypeOfResource === ResourceType.materials) {
      // pobierz materiał
      // pokaz dialog z materiałem w trybie tylko do odczytu
    } else {
      this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
        { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
    }
  }

  save(resource: Resource) {
    this.id = this.route.snapshot.params.id;

    if (this.selectedTypeOfResource === ResourceType.test) {
      this.confirmTestSub = this.groupService.confirmTestsInGroup(this.id, resource.id, resource.points,
        resource.ownerId, resource.comment).subscribe(
        success => {
          this.snackBar.open('Test został zatwierdzony.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
        },
        error => {
          this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        }
      );
    } else if (this.selectedTypeOfResource === ResourceType.flashcards) {
      this.confirmFlashcardsSub = this.groupService.confirmFlashcardsInGroup(this.id, resource.id, resource.points,
        resource.ownerId, resource.comment).subscribe(
        success => {
          this.snackBar.open('Zestaw fiszek został zatwierdzony.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
        },
        error => {
          this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        }
      );
    } else if (this.selectedTypeOfResource === ResourceType.materials) {
      this.confirmMaterialSub = this.groupService.confirmMaterialsInGroup(this.id, resource.id, resource.points,
        resource.ownerId, resource.comment).subscribe(
        success => {
          this.snackBar.open('Materiał został zatwierdzony.', null,
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

  reject(resource: Resource, points: number) {
    this.id = this.route.snapshot.params.id;

    if (this.selectedTypeOfResource === ResourceType.test) {
      this.confirmTestSub = this.groupService.confirmTestsInGroup(this.id, resource.id, points, resource.ownerId,
        resource.comment).subscribe(
        success => {
          this.snackBar.open('Test został zatwierdzony.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
        },
        error => {
          this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        }
      );
    } else if (this.selectedTypeOfResource === ResourceType.flashcards) {
      this.confirmFlashcardsSub = this.groupService.confirmFlashcardsInGroup(this.id, resource.id, points, resource.ownerId,
        resource.comment).subscribe(
        success => {
          this.snackBar.open('Zestaw fiszek został zatwierdzony.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
        },
        error => {
          this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        }
      );
    } else if (this.selectedTypeOfResource === ResourceType.materials) {
      this.confirmMaterialSub = this.groupService.confirmMaterialsInGroup(this.id, resource.id, points, resource.ownerId,
        resource.comment).subscribe(
        success => {
          this.snackBar.open('Materiał został zatwierdzony.', null,
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

  ngOnDestroy() {
    if (this.getWaitingMaterialsSub) {
      this.getWaitingMaterialsSub.unsubscribe();
    }

    if (this.getWaitingTestsSub) {
      this.getWaitingTestsSub.unsubscribe();
    }

    if (this.getWaitingFlashcardsSub) {
      this.getWaitingFlashcardsSub.unsubscribe();
    }

    if (this.confirmTestSub) {
      this.confirmTestSub.unsubscribe();
    }

    if (this.confirmMaterialSub) {
      this.confirmMaterialSub.unsubscribe();
    }

    if (this.confirmFlashcardsSub) {
      this.confirmFlashcardsSub.unsubscribe();
    }
  }

}
