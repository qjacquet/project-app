import { Component, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';
import { Animations } from '../../../../animations';
import { ConfigService } from '../../../../services/config.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector   : 'nav-horizontal-collapse',
    templateUrl: './nav-horizontal-collapse.component.html',
    styleUrls  : ['./nav-horizontal-collapse.component.scss'],
    animations : Animations
})
export class NavHorizontalCollapseComponent implements OnDestroy
{
    onSettingsChanged: Subscription;
    Settings: any;
    isOpen = false;

    @HostBinding('class') classes = 'nav-item nav-collapse';
    @Input() item: any;

    @HostListener('mouseenter')
    open()
    {
        this.isOpen = true;
    }

    @HostListener('mouseleave')
    close()
    {
        this.isOpen = false;
    }

    constructor(
        private Config: ConfigService
    )
    {
        this.onSettingsChanged =
            this.Config.onSettingsChanged
                .subscribe(
                    (newSettings) => {
                        this.Settings = newSettings;
                    }
                );
    }

    ngOnDestroy()
    {
        this.onSettingsChanged.unsubscribe();
    }
}
