import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsAddComponent } from './materials-add.component';

describe('MaterialsAddComponent', () => {
  let component: MaterialsAddComponent;
  let fixture: ComponentFixture<MaterialsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
