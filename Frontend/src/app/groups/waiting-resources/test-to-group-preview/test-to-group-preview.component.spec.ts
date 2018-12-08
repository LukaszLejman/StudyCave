import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestToGroupPreviewComponent } from './test-to-group-preview.component';

describe('TestToGroupPreviewComponent', () => {
  let component: TestToGroupPreviewComponent;
  let fixture: ComponentFixture<TestToGroupPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestToGroupPreviewComponent ]
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
});
