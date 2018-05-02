import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsMemoryTestSetComponent } from './flashcards-memory-test-set.component';

describe('FlashcardsMemoryTestSetComponent', () => {
  let component: FlashcardsMemoryTestSetComponent;
  let fixture: ComponentFixture<FlashcardsMemoryTestSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsMemoryTestSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsMemoryTestSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
