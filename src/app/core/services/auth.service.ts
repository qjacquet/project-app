import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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
        return this.http.post('http://127.0.0.1:3000/auth/', userForm);
    }

    logout()
    {
        console.log('logged out');
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        this.router.navigate(['/pages/auth/login']);
    }
}