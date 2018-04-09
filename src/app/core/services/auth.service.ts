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
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService implements Resolve<any>
{
    routeParams: any;

    auth0 = new auth0.WebAuth({
        clientID: environment.auth0.clientID,
        domain: environment.auth0.domain,
        responseType: 'token id_token',
        audience: 'https://' + environment.auth0.domain + '/userinfo',
        redirectUri: environment.server + '/callback',
        scope: 'openid'
      });

    constructor(
        private http: HttpClient,
        private router: Router
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
     * Call auth method with auth0
     * @param userForm 
     */
    signinAuth0(): void {
        console.log(this.auth0);
        this.auth0.authorize();
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