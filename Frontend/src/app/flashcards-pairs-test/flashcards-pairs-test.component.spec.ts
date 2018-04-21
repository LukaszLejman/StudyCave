import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsPairsTestComponent } from './flashcards-pairs-test.component';

describe('FlashcardsPairsTestComponent', () => {
  let component: FlashcardsPairsTestComponent;
  let fixture: ComponentFixture<FlashcardsPairsTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsPairsTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsPairsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
