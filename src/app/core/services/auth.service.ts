import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute, Resolve, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpRequest , HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Utils } from '../utils';
import { User, UserStatus } from '../models/user';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { filter } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { error } from 'util';

@Injectable()
export class AuthService implements Resolve<any>
{
    routeParams: any;
    redirectUrl: any;

    constructor(
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute,
    ) 
    {
        this.redirectUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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

    logout(redirect?: boolean) {
        var user = this.getCurrentUser();
        user.status = UserStatus.OFFLINE;
        this.http.post(Utils.getApiUri('/logout'), user)
            .subscribe(response => {
                console.log(response);
            });

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

    isAuthenticated(): boolean {
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    isAdmin() {
        var user = this.getCurrentUser();

        if (user.admin)
            return true;

        return false;
    }

    setToken(token) {
        localStorage.setItem('access_token', token);
    }

    getToken() {
        return localStorage.getItem('access_token');
    }

    removeToken() {
        localStorage.removeItem('access_token');
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
}