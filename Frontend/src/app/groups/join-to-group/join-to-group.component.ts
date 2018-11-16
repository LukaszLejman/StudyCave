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

  constructor(private groupsService: GroupsService, private router: Router) { }

  public ngOnInit() {
  }

  public joinToGroup(formValues: JoinToGroupForm) {
    this.groupsService.joinToGroup(formValues).subscribe(
      (data: number) => {
        if (!data) {
          this.isCodeWrong = true;
        } else {
          console.log(`Join to group works. Response: ${data}`);
          this.isCodeWrong = false;
          this.reditectToGroup = true;
          // setTimeout(this.router.navigate(['groups', formValue.name]),3000);
        }
      }
    );
  }

}
