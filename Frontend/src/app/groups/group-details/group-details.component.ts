import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService } from '../groups.service';
import { Group } from '../group';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit, OnDestroy {
  id: number;
  currentUser: string;

  public group: Group;

  groupDetailsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private groupService: GroupsService, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.groupDetailsSubscription = this.groupService.getGroupDetails(this.id).subscribe(data => { this.group = data; });
  }

  ngOnDestroy() {
    if (this.groupDetailsSubscription) {
     this.groupDetailsSubscription.unsubscribe();
    }
  }

  goToEditing() {
    this.router.navigate(['groups/manage', this.id]);
  }


}
