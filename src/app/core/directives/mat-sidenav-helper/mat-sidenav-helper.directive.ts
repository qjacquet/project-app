import { Directive, Input, OnInit, HostListener, OnDestroy, HostBinding } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { MatchMedia } from '../../services/match-media.service';
import { MatSidenavHelperService } from './mat-sidenav-helper.service';

@Directive({
    selector: '[MatSidenavHelper]'
})
export class MatSidenavHelperDirective implements OnInit, OnDestroy
{
    matchMediaSubscription: Subscription;

    @HostBinding('class.mat-is-locked-open') isLockedOpen = true;
    @HostBinding('class.mat-stop-transition') stopTransition = true;

    @Input('MatSidenavHelper') id: string;
    @Input('mat-is-locked-open') matIsLockedOpenBreakpoint: string;

    constructor(
        private MatSidenavService: MatSidenavHelperService,
        private MatchMedia: MatchMedia,
        private observableMedia: ObservableMedia,
        private matSidenav: MatSidenav
    )
    {
    }

    ngOnInit()
    {
        this.MatSidenavService.setSidenav(this.id, this.matSidenav);

        if ( this.observableMedia.isActive(this.matIsLockedOpenBreakpoint) )
        {
            setTimeout(() => {
                this.isLockedOpen = true;
                this.matSidenav.mode = 'side';
                this.matSidenav.open();
            });
            this.stopTransition = false;
        }
        else
        {
            setTimeout(() => {
                this.isLockedOpen = false;
                this.matSidenav.mode = 'over';
                this.matSidenav.close();
            });

            setTimeout(() => {
                this.stopTransition = false;
            }, 3000);
        }

        this.matchMediaSubscription = this.MatchMedia.onMediaChange.subscribe(() => {
            if ( this.observableMedia.isActive(this.matIsLockedOpenBreakpoint) )
            {
                setTimeout(() => {
                    this.isLockedOpen = true;
                    this.matSidenav.mode = 'side';
                    this.matSidenav.open();
                });
            }
            else
            {
                setTimeout(() => {
                    this.isLockedOpen = false;
                    this.matSidenav.mode = 'over';
                    this.matSidenav.close();
                });
            }
        });

    }

    ngOnDestroy()
    {
        this.matchMediaSubscription.unsubscribe();
    }
}

@Directive({
    selector: '[MatSidenavToggler]'
})
export class MatSidenavTogglerDirective
{
    @Input('MatSidenavToggler') id;

    constructor(private MatSidenavService: MatSidenavHelperService)
    {
    }

    @HostListener('click')
    onClick()
    {
        this.MatSidenavService.getSidenav(this.id).toggle();
    }
}
