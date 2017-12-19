import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Utils } from '../utils';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService implements Resolve<any>
{
    routeParams: any;

    constructor(
        private http: HttpClient,
        private router: Router,
    )
    {
    }

    /**
     * The File Manager App Main Resolver
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
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

    signin(userForm) : Observable<any>
    {
        return this.http.post(Utils.getApiUri('/auth'), userForm);
    }

    logout(redirect?: boolean)
    {
        localStorage.removeItem('token');

        if (redirect) {
            this.router.navigate(['login']);
        }
    }

    isLogged()
    {
        if (localStorage.getItem('token')){
            return true;
        }
        return false;
    }
}