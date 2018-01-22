import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../../../core/services/http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Utils } from '../../../../core/utils';

@Injectable()
export class FileManagerService implements Resolve<any>
{
    files: any[];
    routeParams: any;
    file: any;

    onFilesChanged: BehaviorSubject<any> = new BehaviorSubject({});
    onFileSelected: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private http: HttpService)
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
                this.getFiles()
            ]).then(
                ([files]) => {
                    resolve();
                },
                reject
            );
        });
    }

    getFiles(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get(Utils.getApiUri('/files/'))
                .subscribe((response: any) => {
                    this.files = response;
                    this.onFilesChanged.next(response);
                    this.onFileSelected.next(response[0]);
                    resolve(response);
                }, reject);
        });
    }

}
