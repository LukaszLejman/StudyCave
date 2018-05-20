import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsTestTypeMenuComponent } from './flashcards-test-type-menu.component';

describe('FlashcardsTestTypeMenuComponent', () => {
  let component: FlashcardsTestTypeMenuComponent;
  let fixture: ComponentFixture<FlashcardsTestTypeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsTestTypeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsTestTypeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
