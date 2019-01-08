import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

import { Router } from '@angular/router';
import { MaterialsService } from '../materials.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-materials-add',
  templateUrl: './materials-add.component.html',
  styleUrls: ['./materials-add.component.css']
})
export class MaterialsAddComponent implements OnInit {

  private selectedFiles: FileList;
  private currentFileUpload: File;
  private progress: { percentage: number } = { percentage: 0 };
  private currentUser = JSON.parse(localStorage.getItem('currentUser'));
  private user: string;
  private title: string;
  private permission: Boolean = true;
  constructor(private uploadService: MaterialsService, private router: Router, public snackBar: MatSnackBar) { }


  ngOnInit() { this.isLoggedIn(); }

  changePermission(): void {
    this.permission = !this.permission;
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser') === null) {
      this.user = 'Anonim';
    } else {
      this.user = this.currentUser.username;
    }
    // console.log(this.user);
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;
    const title = this.title;
    const url = 'file/save';
    let p = 'Private';
    if (this.permission) {
      p = 'Public';
    }
    const permission = p;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.user, title, permission, url).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.currentFileUpload = undefined;
          this.snackBar.open(`Plik został zaimportowany.
          Swoje materiały możesz podejrzeć na liście materiałów.`, null,
            { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
          this.router.navigate(['materials/list']);
        }
      },
      error => {
        this.snackBar.open('Wystąpił błąd serwera. Spróbuj ponownie później.', null,
          { duration: 3000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
        this.currentFileUpload = undefined;
      }
    );
    this.selectedFiles = undefined;
  }
}


