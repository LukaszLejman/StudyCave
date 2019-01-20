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

  it('should input set correct title', async(() => {
    fixture.autoDetectChanges();
    component.set = {
      'id': 1,
      'name': 'abc',
      'flashcards': [
        {left_side: 'a', right_side: 'b'},
        {left_side: 'c', right_side: 'd'}
      ],
      'grade': 0,
      'owner': 2,
      'add_date': '2019-01-06',
      'edit_date': '2019-01-06',
      'body': []
    };
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelectorAll('h2')[0].textContent).toEqual('abc');
    });
  }));
});
