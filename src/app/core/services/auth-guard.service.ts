import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';

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
    private router: Router,
  ) {}; 

  canActivate() {
      if (localStorage.getItem('token')) {
          // logged in so return true
          return true;
      }
      // not logged in so redirect to login page
      this.router.navigate(['/pages/auth/login']);
      return false;
  }
}