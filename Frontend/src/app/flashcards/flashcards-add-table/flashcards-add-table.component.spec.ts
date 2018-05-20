import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsAddTableComponent } from './flashcards-add-table.component';

describe('FlashcardsAddTableComponent', () => {
  let component: FlashcardsAddTableComponent;
  let fixture: ComponentFixture<FlashcardsAddTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsAddTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsAddTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
