import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialsService } from '../materials.service';
import { Subscription } from 'rxjs/Subscription';

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
  constructor(private route: ActivatedRoute, private materialsService: MaterialsService, private router: Router) { }

  ngOnInit() {
      this.id = this.route.snapshot.params.id;
      this.own = this.materialsService.getOwner();
      this.title = this.materialsService.getTitle();
      this.perm = this.materialsService.getPerm();
      this.isOwner();
      this.IsLogin();
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
      alert('Zmieniono pozwolenie na: ' + this.permission);
      this.router.navigate(['materials/list']);
    }
    ngOnDestroy() {
      if (this.matSubscribtion) {
      this.matSubscribtion.unsubscribe();
      }
    }
    deleteMat() {
      const data = this.id;
      this.matSubscribtion = this.materialsService.deleteMat(data);

    }

}