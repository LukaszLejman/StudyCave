import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharingResourcesInGroupsComponent } from './sharing-resources-in-groups.component';

describe('SharingResourcesInGroupsComponent', () => {
  let component: SharingResourcesInGroupsComponent;
  let fixture: ComponentFixture<SharingResourcesInGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharingResourcesInGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharingResourcesInGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
