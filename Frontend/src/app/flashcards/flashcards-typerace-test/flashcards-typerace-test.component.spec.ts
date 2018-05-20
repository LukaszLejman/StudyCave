import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsTyperaceTestComponent } from './flashcards-typerace-test.component';

describe('FlashcardsTyperaceTestComponent', () => {
  let component: FlashcardsTyperaceTestComponent;
  let fixture: ComponentFixture<FlashcardsTyperaceTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsTyperaceTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsTyperaceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
