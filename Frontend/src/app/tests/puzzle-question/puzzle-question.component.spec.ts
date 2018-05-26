import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleQuestionComponent } from './puzzle-question.component';

describe('PuzzleQuestionComponent', () => {
  let component: PuzzleQuestionComponent;
  let fixture: ComponentFixture<PuzzleQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzleQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
