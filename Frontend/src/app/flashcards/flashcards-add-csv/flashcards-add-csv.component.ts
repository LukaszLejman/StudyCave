import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { FlashcardsService } from '../flashcards.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flashcards-add-csv',
  templateUrl: './flashcards-add-csv.component.html',
  styleUrls: ['./flashcards-add-csv.component.css']
})
export class FlashcardsAddCsvComponent implements OnInit {

  private selectedFiles: FileList;
  private currentFileUpload: File;
  private progress: { percentage: number } = { percentage: 0 };

  constructor(private uploadService: FlashcardsService, private router: Router) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;
    const url = 'file/upload';
    const user = '0';
    this.currentFileUpload = this.selectedFiles.item(0);
    if (this.currentFileUpload.type === 'application/vnd.ms-excel') {
      this.uploadService.pushFileToStorage(this.currentFileUpload, user, url).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.currentFileUpload = undefined;
            alert(`Plik został zaimportowany.
            Swoje fiszki możesz podejrzeć na liście zestawów fiszek
            i tam je edytować jeśli zajdzie taka potrzeba :)`);
            this.router.navigate(['flashcards/sets']);
          }
        },
        error => {
          alert('Coś poszło nie tak. Spróbuj ponownie później.');
          this.currentFileUpload = undefined;
        }
      );
    } else {
      this.currentFileUpload = undefined;
      alert('Wybierz plik CSV!');
    }
    this.selectedFiles = undefined;
  }
}
