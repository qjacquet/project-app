import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Utils } from '../utils';
import { User, UserStatus } from '../models/user';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService implements Resolve<any>
{
    routeParams: any;

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
    }

    /**
     * The File Manager App Main Resolver
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {
            Promise.all([
            ]).then(
                () => {
                    resolve();
                },
                reject
                );
        });
    }

    /**
     * Call auth method
     * @param userForm 
     */
    signin(userForm): Observable<any> {
        return this.http.post(Utils.getApiUri('/auth'), userForm);
    }

    /**
     * Call register method
     * @param userForm 
     */
    register(userForm): Observable<any> {
        return this.http.post(Utils.getApiUri('/register'), userForm);
    }

    /** 
     * Helper methods 
     */
    logout(redirect?: boolean) {
        var user = this.getCurrentUser();
        user.status = UserStatus.OFFLINE;
        this.http.put(Utils.getApiUri('/logout'), user);

        this.removeToken();

        if (redirect) {
            this.router.navigate(['login']);
        }
    }

    isLogged() {
        if (this.getToken()) {
            return true;
        }
        return false;
    }

    isAdmin() {
        var user = this.getCurrentUser();

        if (user.admin)
            return true;

        return false;
    }

    setToken(token) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    removeToken() {
        localStorage.removeItem('token');
    }

    getCurrentUser(): User {
        var user = new User();
        var token = this.getToken();

        if (token) {
            var jwtHelper = new JwtHelper();
            user = jwtHelper.decodeToken(token);
        }

        return user;
    }

    updateCurrentUserStatus(status: UserStatus) {
        var user = this.getCurrentUser();
        user.status = status.valueOf();
        console.log(user);
        return this.http.put(Utils.getApiUri('/users/') + user.id, user)
    }
}