import { Component, OnInit } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';

@Component({
  selector: 'app-flashcards-add-csv',
  templateUrl: './flashcards-add-csv.component.html',
  styleUrls: ['./flashcards-add-csv.component.css']
})
export class FlashcardsAddCsvComponent implements OnInit {

  fileToUpload: File = null;

  constructor(private flashcardsService: FlashcardsService) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  addFile() {
    this.flashcardsService.postFile(this.fileToUpload)/*.subscribe(data => {
      alert('Wysłano!');
      }, error => {
        console.log(error);
      });*/
    }

}
