import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { UserService } from '../../fake-db/fake-db.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  canActivate() {
    return true;
  }

  canActivateChild() {
    return true;
  }
}

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate { 
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}; 

  canActivate() {
      // if (localStorage.getItem('currentUser')) {
      //     // logged in so return true
      //     return true;
      // }
      // // not logged in so redirect to login page
      // this.router.navigate(['/pages/auth/login']);
      // return false;
      return true;
  }
}