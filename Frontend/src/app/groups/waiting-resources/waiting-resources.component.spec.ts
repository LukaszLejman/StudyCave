import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingResourcesComponent } from './waiting-resources.component';

describe('WaitingResourcesComponent', () => {
  let component: WaitingResourcesComponent;
  let fixture: ComponentFixture<WaitingResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
