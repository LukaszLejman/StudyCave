import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsAddCsvComponent } from './flashcards-add-csv.component';

describe('FlashcardsAddCsvComponent', () => {
  let component: FlashcardsAddCsvComponent;
  let fixture: ComponentFixture<FlashcardsAddCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsAddCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsAddCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
