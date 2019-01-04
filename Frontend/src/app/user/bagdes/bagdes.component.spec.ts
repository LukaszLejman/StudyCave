import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BagdesComponent } from './bagdes.component';

describe('BagdesComponent', () => {
  let component: BagdesComponent;
  let fixture: ComponentFixture<BagdesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BagdesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BagdesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
