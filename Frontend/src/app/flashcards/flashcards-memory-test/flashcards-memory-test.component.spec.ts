import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsMemoryTestComponent } from './flashcards-memory-test.component';

describe('FlashcardsMemoryTestComponent', () => {
  let component: FlashcardsMemoryTestComponent;
  let fixture: ComponentFixture<FlashcardsMemoryTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsMemoryTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsMemoryTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
