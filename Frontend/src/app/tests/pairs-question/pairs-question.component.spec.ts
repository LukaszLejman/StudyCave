import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PairsQuestionComponent } from './pairs-question.component';

describe('PairsQuestionComponent', () => {
  let component: PairsQuestionComponent;
  let fixture: ComponentFixture<PairsQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PairsQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairsQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
