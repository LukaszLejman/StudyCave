import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsSetsListComponent } from './flashcards-sets-list.component';

describe('FlashcardsSetsListComponent', () => {
  let component: FlashcardsSetsListComponent;
  let fixture: ComponentFixture<FlashcardsSetsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsSetsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsSetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
