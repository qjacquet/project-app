import { Component, ElementRef, HostBinding, Inject, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ConfigService } from '../core/services/config.service';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { AutofocusDirective } from '../core/directives/autofocus/autofocus.directive';

@Component({
    selector     : 'main',
    templateUrl  : './main.component.html',
    styleUrls    : ['./main.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, OnDestroy
{
    onSettingsChanged: Subscription;
    Settings: any;
    @HostBinding('attr.layout-mode') layoutMode;

    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private Config: ConfigService,
        private platform: Platform,
        @Inject(DOCUMENT) private document: any
    )
    {
        this.onSettingsChanged =
            this.Config.onSettingsChanged
                .subscribe(
                    (newSettings) => {
                        this.Settings = newSettings;
                        this.layoutMode = this.Settings.layout.mode;
                    }
                );

        if ( this.platform.ANDROID || this.platform.IOS )
        {
            this.document.body.className += ' is-mobile';
        }
    }

    ngOnInit()
    {
    }

    ngOnDestroy()
    {
        this.onSettingsChanged.unsubscribe();
    }

    addClass(className: string)
    {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }

    removeClass(className: string)
    {
        this._renderer.removeClass(this._elementRef.nativeElement, className);
    }
}
