import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

import { Router } from '@angular/router';
import { MaterialsService } from '../materials.service';

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
  constructor(private uploadService: MaterialsService, private router: Router) { }


  ngOnInit() { this.isLoggedIn(); }

  isLoggedIn() {
    if (localStorage.getItem('currentUser') === null) {
      this.user = 'Anonim';
    } else {
      this.user = this.currentUser.username;
    }
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;
    const url = 'file/upload';
    const permission = 'public';
    this.currentFileUpload = this.selectedFiles.item(0);
      this.uploadService.pushFileToStorage(this.currentFileUpload, this.user, permission, url).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.currentFileUpload = undefined;
            alert(`Plik został zaimportowany.
            Swoje materiały możesz podejrzeć na liście materiałów.`);
            this.router.navigate(['materials/l']);
          }
        },
        error => {
          alert('Coś poszło nie tak. Spróbuj ponownie później.');
          this.currentFileUpload = undefined;
        }
      );
    this.selectedFiles = undefined;
  }
}
