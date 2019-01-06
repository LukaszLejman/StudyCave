import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingComponent } from './ranking.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule, MatFormFieldModule } from '@angular/material';
import { GroupsService } from '../groups.service';
import { AuthenticationService } from '../../authentication.service';

describe('RankingComponent', () => {
  let component: RankingComponent;
  let fixture: ComponentFixture<RankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule, FormsModule, HttpClientModule, MatSnackBarModule, MatFormFieldModule],
      providers: [GroupsService, AuthenticationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
