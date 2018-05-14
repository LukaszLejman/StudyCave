import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMakerComponent } from './test-maker.component';

describe('TestMakerComponent', () => {
  let component: TestMakerComponent;
  let fixture: ComponentFixture<TestMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
