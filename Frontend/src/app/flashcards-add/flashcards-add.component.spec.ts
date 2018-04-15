import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsAddComponent } from './flashcards-add.component';

describe('FlashcardsAddComponent', () => {
  let component: FlashcardsAddComponent;
  let fixture: ComponentFixture<FlashcardsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
