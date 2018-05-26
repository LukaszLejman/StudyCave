import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GapsQuestionComponent } from './gaps-question.component';

describe('GapsQuestionComponent', () => {
  let component: GapsQuestionComponent;
  let fixture: ComponentFixture<GapsQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GapsQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GapsQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
