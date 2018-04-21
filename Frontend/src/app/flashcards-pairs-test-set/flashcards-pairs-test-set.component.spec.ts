import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsPairsTestSetComponent } from './flashcards-pairs-test-set.component';

describe('FlashcardsPairsTestSetComponent', () => {
  let component: FlashcardsPairsTestSetComponent;
  let fixture: ComponentFixture<FlashcardsPairsTestSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsPairsTestSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsPairsTestSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
