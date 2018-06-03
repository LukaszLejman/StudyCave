import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsService } from '../../../tests.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-gaps',
  templateUrl: './gaps.component.html',
  styleUrls: ['./gaps.component.css']
})
export class GapsComponent implements OnInit {
  @Input()
  private question;
  @Output() emitNextQuestionRequest = new EventEmitter();
  private id;

  constructor(private route: ActivatedRoute, private testsService: TestsService) { }

  nextQuestion(f) {
    console.log(f);
    this.id = this.route.snapshot.params.id;
    const answers = this.question.answers.filter(element => {
      return element.is_gap;
    });
    const gapsContent = [];
    answers.forEach(element => {
      gapsContent.push({ id: element.id, content: f.value[element.id] });
    });
    const body = { id: this.question.id, type: 'gaps', answers: gapsContent };
    this.testsService.verifyAnswer(this.id, body).subscribe(d => {
      console.log(body);
      $('.answers').find('[type="text"]').prop('value', '');
      this.emitNextQuestionRequest.emit(d);
    });
  }

  ngOnInit() {
  }

}
