import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../groups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-to-group',
  templateUrl: './join-to-group.component.html',
  styleUrls: ['./join-to-group.component.css']
})
export class JoinToGroupComponent implements OnInit {

  public isCodeWrong = false;
  public reditectToGroup = false;
  public reditectToGroupMessage = '';

  constructor(private groupsService: GroupsService, private router: Router) { }

  public ngOnInit() {
  }

  public joinToGroup(formValues: JoinToGroupForm) {
    this.groupsService.joinToGroup(formValues).subscribe(
      (data: number) => {
        if (data === 2) {
          this.isCodeWrong = false;
          this.reditectToGroupMessage = 'Dołączyłeś do grupy';
          this.reditectToGroup = true;
          // setTimeout(this.router.navigate(['groups', formValue.name]),3000);
        } else {
          if (data === 1) {
            this.isCodeWrong = false;
            this.reditectToGroupMessage = 'Jesteś już w tej grupie';
            this.reditectToGroup = true;
            // setTimeout(this.router.navigate(['groups', formValue.name]),3000);
          } else {
            this.isCodeWrong = true;
          }
        }
      }
    );
  }

}
