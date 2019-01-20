import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestToGroupPreviewComponent } from './test-to-group-preview.component';

describe('TestToGroupPreviewComponent', () => {
  let component: TestToGroupPreviewComponent;
  let fixture: ComponentFixture<TestToGroupPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestToGroupPreviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestToGroupPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should input set correct title', async(() => {
    fixture.autoDetectChanges();
    component.test = {
      'id': 1,
      'title': 'abc',
      'permission': 'public',
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
