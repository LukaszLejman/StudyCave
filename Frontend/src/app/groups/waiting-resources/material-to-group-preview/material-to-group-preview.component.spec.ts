import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialToGroupPreviewComponent } from './material-to-group-preview.component';

describe('MaterialToGroupPreviewComponent', () => {
  let component: MaterialToGroupPreviewComponent;
  let fixture: ComponentFixture<MaterialToGroupPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialToGroupPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialToGroupPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
