import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsSetDetailComponent } from './flashcards-set-detail.component';

describe('FlashcardsSetDetailComponent', () => {
  let component: FlashcardsSetDetailComponent;
  let fixture: ComponentFixture<FlashcardsSetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsSetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsSetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
