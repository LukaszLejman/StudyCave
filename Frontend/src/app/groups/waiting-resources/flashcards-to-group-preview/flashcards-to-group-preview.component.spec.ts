import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsToGroupPreviewComponent } from './flashcards-to-group-preview.component';

describe('FlashcardsToGroupPreviewComponent', () => {
  let component: FlashcardsToGroupPreviewComponent;
  let fixture: ComponentFixture<FlashcardsToGroupPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsToGroupPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsToGroupPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
