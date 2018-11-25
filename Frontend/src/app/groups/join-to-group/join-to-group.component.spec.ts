import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinToGroupComponent } from './join-to-group.component';

describe('JoinToGroupComponent', () => {
  let component: JoinToGroupComponent;
  let fixture: ComponentFixture<JoinToGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinToGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinToGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
