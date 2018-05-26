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
  matsEmpty = true;
  selectedMat: any;
  materialsSubscription: Subscription;
  ShowStatus: Boolean = false;
  user: Boolean = false;

  constructor(private materialsService: MaterialsService, private router: Router) {}

  ngOnInit() {
    // this.getMats();
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
  }
  ShowPrivate() {
    this.ShowStatus = true;
  }
  onSelect(mat: any): void {
    this.selectedMat = mat;
    // pobieranie pliku
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
  ngOnDestroy() {
   // this.materialsSubscription.unsubscribe();
  }

}
