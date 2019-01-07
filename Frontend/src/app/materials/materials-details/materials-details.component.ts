import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialsService } from '../materials.service';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoutingStateService } from '../../routing-state.service';

@Component({
  selector: 'app-materials-details',
  templateUrl: './materials-details.component.html',
  styleUrls: ['./materials-details.component.css']
})
export class MaterialsDetailsComponent implements OnInit, OnDestroy {
  id: number;
  mat: any;
  matSubscribtion: Subscription;
  testTypeMenu = false;
  user: Boolean = false;
  ShowStatus: Boolean = false;
  permission: string;
  title: string;
  owner: string;
  own: string;
  perm: string;
  owned: Boolean = false;
  display = false;
  serverURL = 'http://studycave.eu-west-1.elasticbeanstalk.com/#/file/files/'; // działa na globalu
  // serverURL = 'http://localhost:8080/file/files/' ; // działa na localhost
  constructor(private route: ActivatedRoute, private materialsService: MaterialsService, private router: Router,
    private routingState: RoutingStateService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.own = this.materialsService.getOwner();
    this.title = this.materialsService.getTitle();
    this.perm = this.materialsService.getPerm();
    this.isOwner();
    this.IsLogin();
  }

  openPopup() {
    this.display = true;
  }

  isOwner() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (localStorage.getItem('currentUser')) {
      if (currentUser.username === this.own) {
        this.owned = true;
      }
    } else {
      this.owned = false;
    }
  }

  IsLogin() {
    if (localStorage.getItem('currentUser')) {
      this.user = true;
    } else {
      this.user = false;
    }
  }

  changePermission(): void {
    if (this.perm === 'Public') {
      this.permission = 'Private';
    } else {
      this.permission = 'Public';
    }
    this.materialsService.changeMatPermission(this.id, this.permission);
    this.snackBar.open('Zmieniono pozwolenie na: ' + this.permission, null,
      { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
    this.goBack();
  }

  ngOnDestroy() {
    if (this.matSubscribtion) {
      this.matSubscribtion.unsubscribe();
    }
  }
  deleteMat() {
    const data = this.id;
    this.matSubscribtion = this.materialsService.deleteMat(data);
    this.display = false;

  }

  download() {
    this.materialsService.downloadFile(this.id);
    // this.goBack();
    // console.log('download');
  }

  goBack() {
    const previousUrl = this.routingState.getPreviousUrl();
    this.router.navigate([previousUrl]);
  }

}
