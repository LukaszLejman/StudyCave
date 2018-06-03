import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsService } from '../../../tests.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit, OnChanges {
  @Input()
  private question;
  @Output() emitNextQuestionRequest = new EventEmitter();
  private id;

  private puzzles = [];
  private puzzlesToSend = [];
  private selectedPuzzle = { indexOfPuzzle: Number, puzzleText: String, from: '' };

  constructor(private route: ActivatedRoute, private testsService: TestsService) { }

  nextQuestion(f) {
    this.id = this.route.snapshot.params.id;
    const body = { id: this.question.id, type: 'puzzle', answers: [{ id: this.question.answers[0].id, puzzles: this.puzzlesToSend }] };
    this.testsService.verifyAnswer(this.id, body).subscribe(d => {
      $('.answers').find('[type="text"]').prop('value', '');
      this.emitNextQuestionRequest.emit(d);
    });
  }

  puzzleClick(item, i) {
    if (item !== '' && item !== undefined) {
      if (this.selectedPuzzle.from === 'puzzles') {
        this.selectedPuzzle = { indexOfPuzzle: undefined, puzzleText: undefined, from: undefined };
      } else {
        this.selectedPuzzle = { indexOfPuzzle: i, puzzleText: item, from: 'puzzles' };
      }
    }
  }

  puzzleToSendClick(item, i) {
    if (this.selectedPuzzle.from === 'puzzles') {
      const helper = this.puzzlesToSend[i];
      this.puzzlesToSend[i] = this.selectedPuzzle.puzzleText;
      this.puzzles[Number(this.selectedPuzzle.indexOfPuzzle)] = helper;
      this.selectedPuzzle = { indexOfPuzzle: undefined, puzzleText: undefined, from: undefined };
    } else if (this.selectedPuzzle.from === 'puzzlesToSend') {
      const helper = this.puzzlesToSend[i];
      this.puzzlesToSend[i] = this.selectedPuzzle.puzzleText;
      this.puzzlesToSend[Number(this.selectedPuzzle.indexOfPuzzle)] = helper;
      this.selectedPuzzle = { indexOfPuzzle: undefined, puzzleText: undefined, from: undefined };
    } else if (item !== '' && item !== undefined) {
      this.selectedPuzzle = { indexOfPuzzle: i, puzzleText: item, from: 'puzzlesToSend' };
    }
  }

  prepareLists() {
    this.selectedPuzzle = { indexOfPuzzle: undefined, puzzleText: undefined, from: undefined };
    this.puzzles = [];
    this.puzzlesToSend = [];
    this.puzzles = JSON.parse(JSON.stringify(this.question.answers[0].puzzles));
    this.puzzles.forEach(element => {
      this.puzzlesToSend.push('');
    });
  }

  ngOnInit() {
    this.prepareLists();
  }

  ngOnChanges() {
    this.prepareLists();
  }

}
