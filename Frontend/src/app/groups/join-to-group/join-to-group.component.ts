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
  public reditectToGroupMessage = '';
  private joinSubscribtion: Subscription;

  constructor(private groupsService: GroupsService, private router: Router) { }

  public joinToGroup(formValues: JoinToGroupForm) {
    this.joinSubscribtion = this.groupsService.joinToGroup(formValues).subscribe(
      (data) => { },
      (error) => {
        if (error.status === 200) {
          this.isCodeWrong = false;
          this.reditectToGroupMessage = 'Dołączyłeś do grupy';
          this.reditectToGroup = true;
          setTimeout(() => this.router.navigate(['groups', formValues.name]), 3000);
        } else if (error.status === 409) {
          this.isCodeWrong = false;
          this.reditectToGroupMessage = 'Już jesteś w tej grupie';
          this.reditectToGroup = true;
          setTimeout(() => this.router.navigate(['groups', formValues.name]), 3000);
        } else {
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
