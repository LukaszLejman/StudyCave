import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOfActivityInGroupComponent } from './history-of-activity-in-group.component';

describe('HistoryOfActivityInGroupComponent', () => {
  let component: HistoryOfActivityInGroupComponent;
  let fixture: ComponentFixture<HistoryOfActivityInGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryOfActivityInGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryOfActivityInGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
