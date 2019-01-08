import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsSetDetailComponent } from './flashcards-set-detail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';
import { AuthenticationService } from '../../authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { RoutingStateService } from '../../routing-state.service';

describe('FlashcardsSetDetailComponent', () => {
  let component: FlashcardsSetDetailComponent;
  let fixture: ComponentFixture<FlashcardsSetDetailComponent>;
  let mockSet: any;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashcardsSetDetailComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [FlashcardsService, AuthenticationService, RoutingStateService],
      imports: [ RouterTestingModule, FormsModule, HttpClientModule, MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsSetDetailComponent);
    component = fixture.componentInstance;
    mockSet = {
      name: 'testName',
      flashcards: [
        {
          left_side: 'testLeftSide',
          right_side: 'testRightSide'
        }
      ]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    // testowanie DOM
    it('should render set name', () => {
      component.set = mockSet;
      fixture.detectChanges();
      const setName = document.querySelector('h2').innerHTML;
      expect(setName).toEqual(mockSet.name);
    });

    it('should render flashcards sides', () => {
      component.set = mockSet;
      fixture.detectChanges();
      const leftSide = document.querySelector('.puzzle').innerHTML;
      expect(leftSide).toEqual('testLeftSide');
      const rightSide = document.querySelector('.puzzle-right').innerHTML;
      expect(rightSide).toEqual('testRightSide');
    });
});
