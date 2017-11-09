import { Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NavigationService } from './navigation.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector     : 'navigation',
    templateUrl  : './navigation.component.html',
    styleUrls    : ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnDestroy
{
    navigationModel: any[];
    navigationModelChangeSubscription: Subscription;

    @Input('layout') layout = 'vertical';

    constructor(private NavigationService: NavigationService)
    {
        this.navigationModelChangeSubscription =
            this.NavigationService.onNavigationModelChange
                .subscribe((navigationModel) => {
                    this.navigationModel = navigationModel;
                });
    }

    ngOnDestroy()
    {
        this.navigationModelChangeSubscription.unsubscribe();
    }

}
