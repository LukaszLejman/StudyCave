import { TestBed, inject } from '@angular/core/testing';

import { GroupsService } from './groups.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthenticationService } from '../authentication.service';

describe('GroupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupsService, AuthenticationService],
      imports: [ RouterTestingModule, HttpClientModule, MatSnackBarModule]
    });
  });

  it('should be created', inject([GroupsService], (service: GroupsService) => {
    expect(service).toBeTruthy();
  }));
});
