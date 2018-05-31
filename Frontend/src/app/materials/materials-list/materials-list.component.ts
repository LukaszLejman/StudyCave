import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MaterialsService } from '../materials.service';

@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.css']
})
export class MaterialsListComponent implements OnInit, OnDestroy {

  mats = [{}];
  matsPrivate = [{}];
  matsEmpty = true;
  selectedMat: any;
  materialsSubscription: Subscription;
  materialsSubscriptionOwners: Subscription;
  ShowStatus: Boolean = false;
  user: Boolean = false;

  constructor(private materialsService: MaterialsService, private router: Router) {}

  ngOnInit() {
    this.getMats();
    this.IsLogin();
  }

  IsLogin() {
    if (localStorage.getItem('currentUser')) {
    this.user = true;
    } else {
    this.user = false;
    }
  }
  ShowPublic() {
    this.ShowStatus = false;
    this.getMats();
  }
  ShowPrivate() {
    this.ShowStatus = true;
    this.getMatsOwners();
  }
  onSelect(mat: any): void {
    this.selectedMat = mat;
    this.materialsService.setOwner(this.selectedMat.owner);
    this.materialsService.setTitle(this.selectedMat.title);
    this.materialsService.setPerm(this.selectedMat.permission);
    this.router.navigate(['materials/', this.selectedMat.id]);
  }

  getMats(): void {
    this.materialsSubscription = this.materialsService.getMaterials()
      .subscribe(data => {
        this.mats = data;
        if (this.mats.length > 0) {
          this.matsEmpty = false;
        } else {
          this.matsEmpty = true;
        }
      });
  }
  getMatsOwners(): void {
    this.materialsSubscriptionOwners = this.materialsService.getMaterialsOwners()
      .subscribe(data => {
        this.matsPrivate = data;
        if (this.matsPrivate.length > 0) {
          this.matsEmpty = false;
        } else {
          this.matsEmpty = true;
        }
      });
  }
  ngOnDestroy() {
    if (this.materialsSubscription) {
   this.materialsSubscription.unsubscribe();
    }
    if (this.materialsSubscriptionOwners) {
   this.materialsSubscriptionOwners.unsubscribe();
    }
  }

}
