import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

      if (localStorage.getItem('token')) {
          return true;
      }

      this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
      return false;
  }
}

@Injectable()
export class OnlyVisitorGuard implements CanActivate { 
  constructor(
    private router: Router,
  ) {}; 

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (localStorage.getItem('token')) {
          this.router.navigate(['/']);
          return false;
      }

      return true;
  }
}