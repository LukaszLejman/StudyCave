import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupsService } from '../groups.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-join-to-group',
  templateUrl: './join-to-group.component.html',
  styleUrls: ['./join-to-group.component.css']
})
export class JoinToGroupComponent implements OnInit, OnDestroy {

  public isCodeWrong = false;
  public reditectToGroup = false;
  public errorMessage = '';
  private joinSubscribtion: Subscription;

  constructor(private groupsService: GroupsService, private router: Router) { }

  public joinToGroup(formValues: JoinToGroupForm): void {
    this.joinSubscribtion = this.groupsService.joinToGroup(formValues).subscribe(
      (data) => {
        if (data.status === 200) {
          this.isCodeWrong = false;
          this.reditectToGroup = true;
          if (data.body) {
            const groupID = JSON.parse(data.body).id;
            this.isCodeWrong = false;
            this.reditectToGroup = true;
            setTimeout(() => this.router.navigate(['groups', groupID]), 3000);
          }
        }
      },
      (error) => {
        if (error.status === 409) {
          this.errorMessage = 'Już jesteś w tej grupie.';
          this.isCodeWrong = true;
          this.reditectToGroup = false;
        } else {
          this.errorMessage = 'Nieprawidłowy kod.';
          this.isCodeWrong = true;
          this.reditectToGroup = false;
        }
      }
    );
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    if (this.joinSubscribtion) {
      this.joinSubscribtion.unsubscribe();
    }
  }

}
