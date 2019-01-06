import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BagdesComponent } from './bagdes.component';
import { UserService } from '../user.service';
import { AuthenticationService } from '../../authentication.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule, MatFormFieldModule } from '@angular/material';

describe('BagdesComponent', () => {
  let component: BagdesComponent;
  let fixture: ComponentFixture<BagdesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BagdesComponent ],
      providers: [UserService, AuthenticationService],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule, FormsModule, HttpClientModule, MatSnackBarModule, MatFormFieldModule]
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
