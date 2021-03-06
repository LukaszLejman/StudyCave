import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from '../groups.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Resource } from '../resource';
import { ResourceType } from '../sharing-resources-in-groups/sharing-resources-in-groups';
import { Subscription } from 'rxjs/Subscription';
import localeText from './localeText';
import { GridOptions } from 'ag-grid-community';
import { TestsService } from '../../tests/tests.service';
import { Test } from '../../tests/test_model';
import { FlashcardsService } from '../../flashcards/flashcards.service';

import * as $ from 'jquery';

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
  public selectedResource: Resource = {};

  private getWaitingMaterialsSub: Subscription;
  private getWaitingTestsSub: Subscription;
  private getWaitingFlashcardsSub: Subscription;

  private confirmTestSub: Subscription;
  private confirmMaterialSub: Subscription;
  private confirmFlashcardsSub: Subscription;

  private testSubscribtion: Subscription;
  private flashcardSubscribtion: Subscription;

  private gridApi: any;
  public gridOptions: GridOptions;
  public localeText = localeText;

  public columnDefs = [
    { headerName: 'Nazwa', field: 'title', headerTooltip: 'Nazwa' },
    { headerName: 'Właściciel', field: 'owner', headerTooltip: 'Właściciel', hide: false },
    {
      headerName: '',
      suppressMenu: true,
      suppressSorting: true,
      cellRenderer: this.customCellRendererFunc
    }
  ];

  public displayMaterials = false;
  public displayTests = false;
  public displayFlashcards = false;

  public displayPreviewDialog = false;
  public displayAcceptDialog = false;
  public displayRejectDialog = false;

  public test: Test;
  public set: any;

  public width = 300;

  constructor(private route: ActivatedRoute,
    private groupService: GroupsService,
    private testService: TestsService,
    private flashcardsService: FlashcardsService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.gridOptions = {
      rowHeight: 50,
      headerHeight: 25,
      getRowStyle: function (params) {
        return {
          cursor: 'pointer'
        };
      },
    };
  }

  getWaitingMaterials() {
    this.selectedTypeOfResource = ResourceType.materials;
    this.displayMaterials = true;
    this.displayTests = false;
    this.displayFlashcards = false;
    this.getWaitingMaterialsSub = this.groupService.getWaitingMaterialsInGroup(this.id).subscribe(
      success => {
        this.waitingTests = [];
        this.waitingFlashcards = [];
        this.waitingMaterials = success;
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
    this.displayMaterials = false;
    this.displayTests = true;
    this.displayFlashcards = false;
    this.getWaitingTestsSub = this.groupService.getWaitingTestsInGroup(this.id).subscribe(
      success => {
        this.waitingFlashcards = [];
        this.waitingMaterials = [];
        this.waitingTests = success;
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
    this.displayMaterials = false;
    this.displayTests = false;
    this.displayFlashcards = true;
    this.getWaitingFlashcardsSub = this.groupService.getWaitingFlashcardsInGroup(this.id).subscribe(
      success => {
        this.waitingMaterials = [];
        this.waitingTests = [];
        this.waitingFlashcards = success;
      },
      error => {
        this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
          { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        console.log('Something went wrong :( \nError: ', error);
      }
    );
  }

  refreshList() {
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

  save(resource: Resource) {
    this.id = this.route.snapshot.params.id;

    if (this.selectedTypeOfResource === ResourceType.test) {
      this.confirmTestSub = this.groupService.acceptTestsInGroup(this.id, resource.id, resource.points,
        resource.comment).subscribe(
        success => {
          this.refreshList();
          this.displayAcceptDialog = false;
          this.snackBar.open('Test został zatwierdzony.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
        },
        error => {
          this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        }
      );
    } else if (this.selectedTypeOfResource === ResourceType.flashcards) {
      this.confirmFlashcardsSub = this.groupService.acceptFlashcardsInGroup(this.id, resource.id, resource.points,
        resource.comment).subscribe(
        success => {
          this.refreshList();
          this.displayAcceptDialog = false;
          this.snackBar.open('Zestaw fiszek został zatwierdzony.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
        },
        error => {
          this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        }
      );
    } else if (this.selectedTypeOfResource === ResourceType.materials) {
      this.confirmMaterialSub = this.groupService.acceptMaterialsInGroup(this.id, resource.id, resource.points,
        resource.comment).subscribe(
        success => {
          this.refreshList();
          this.displayAcceptDialog = false;
          this.snackBar.open('Materiał został zatwierdzony.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
        },
        error => {
          this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        }
      );
    }
  }

  reject(resource: Resource) {
    this.id = this.route.snapshot.params.id;

    if (this.selectedTypeOfResource === ResourceType.test) {
      this.confirmTestSub = this.groupService.rejectTestsFromGroup(this.id, resource.id, resource.comment).subscribe(
        success => {
          this.refreshList();
          this.displayRejectDialog = false;
          this.snackBar.open('Test został odrzucony.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
        },
        error => {
          this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        }
      );
    } else if (this.selectedTypeOfResource === ResourceType.flashcards) {
      this.confirmFlashcardsSub = this.groupService.rejectFlashcardsFromGroup(this.id, resource.id, resource.comment).subscribe(
        success => {
          this.refreshList();
          this.displayRejectDialog = false;
          this.snackBar.open('Zestaw fiszek został odrzucony.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
        },
        error => {
          this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        }
      );
    } else if (this.selectedTypeOfResource === ResourceType.materials) {
      this.confirmMaterialSub = this.groupService.rejectMaterialsFromGroup(this.id, resource.id, resource.comment).subscribe(
        success => {
          this.refreshList();
          this.displayRejectDialog = false;
          this.snackBar.open('Materiał został odrzucony.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
        },
        error => {
          this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        }
      );
    }
  }

  setWidth() {
    const width = $('body').innerWidth();
    if (width > 1000) {
      this.width = width - 700;
    } else {
      this.width = 300;
    }
  }

  onActionPreviewClick(e) {
    this.setWidth();
    if (this.waitingTests.length > 0) {
      this.testSubscribtion = this.testService.getTest(e.data.id).subscribe(
        data => {
          this.test = data;
          this.selectedResource = e.data;
          this.displayPreviewDialog = true;
        },
        error => {
          this.snackBar.open('Coś poszło nie tak. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        }
      );
    } else if (this.waitingFlashcards.length > 0) {
      this.flashcardSubscribtion = this.flashcardsService.getSet(e.data.id).subscribe(
        data => {
          this.set = data;
          this.selectedResource = e.data;
          this.displayPreviewDialog = true;
        },
        error => {
          this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
          console.log('Something went wrong :( \nError: ', error);
        });
    } else {
      this.selectedResource = e.data;
      this.displayPreviewDialog = true;
    }
  }

  onActionAcceptClick(e) {
    this.selectedResource = e.data;
    this.selectedResource.comment = '';
    this.selectedResource.points = 0;
    this.displayAcceptDialog = true;
  }

  onActionRejectClick(e) {
    this.selectedResource = e.data;
    this.selectedResource.comment = '';
    this.displayRejectDialog = true;
  }

  onRowClicked(e) {
    if (e.event.target !== undefined) {
      const actionType = e.event.target.getAttribute('data-action-type');
      switch (actionType) {
        case 'preview':
          return this.onActionPreviewClick(e);
        case 'accept':
          return this.onActionAcceptClick(e);
        case 'reject':
          return this.onActionRejectClick(e);
        default:
          return this.onActionPreviewClick(e);
      }
    }
  }

  customCellRendererFunc(params) {
    return `
      <button type="button" data-action-type="preview" class="btn btn-study-cave btn-sm" title="Podgląd">
      <i class="far fa-eye" data-action-type="preview"></i></button>
      <button type="button" data-action-type="accept" class="btn btn-study-cave btn-sm" title="Akceptuj">
      <i class="fas fa-check-circle" data-action-type="accept"></i></button>
      <button type="button" data-action-type="reject" class="btn btn-study-cave btn-sm" title="Odrzuć">
      <i class="fas fa-times" data-action-type="reject"></i></button>
    `;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onGridColumnsChanged(params) {
    params.api.sizeColumnsToFit();
  }

  onGridSizeChanged(params) {
    if (params.clientWidth < 800) {
      this.columnDefs = [
        { headerName: 'Nazwa', field: 'title', headerTooltip: 'Nazwa' },
        { headerName: 'Właściciel', field: 'owner', headerTooltip: 'Właściciel', hide: true },
        {
          headerName: '',
          suppressMenu: true,
          suppressSorting: true,
          cellRenderer: this.customCellRendererFunc
        }
      ];
    } else {
      this.columnDefs = [
        { headerName: 'Nazwa', field: 'title', headerTooltip: 'Nazwa' },
        { headerName: 'Właściciel', field: 'owner', headerTooltip: 'Właściciel', hide: false },
        {
          headerName: '',
          suppressMenu: true,
          suppressSorting: true,
          cellRenderer: this.customCellRendererFunc
        }
      ];
    }
    params.api.sizeColumnsToFit();
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

    if (this.testSubscribtion) {
      this.testSubscribtion.unsubscribe();
    }

    if (this.flashcardSubscribtion) {
      this.flashcardSubscribtion.unsubscribe();
    }
  }

}
