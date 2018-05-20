import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsFillingInTestComponent } from './flashcards-filling-in-test.component';

describe('FlashcardsFillingInTestComponent', () => {
  let component: FlashcardsFillingInTestComponent;
  let fixture: ComponentFixture<FlashcardsFillingInTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsFillingInTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsFillingInTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
