import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Utils } from '../utils';
import { User, UserStatus } from '../models/user';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService implements Resolve<any>
{
    routeParams: any;

    constructor(
        private http: HttpService,
        private authService: AuthService,
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

    changeCurrentUserStatus(status): Promise<any>
    {
        var user = this.authService.getCurrentUser();
        user.status = status;

        return new Promise((resolve, reject) => {
            this.http.put(Utils.getApiUri('/users/') + user.id, user) 
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}