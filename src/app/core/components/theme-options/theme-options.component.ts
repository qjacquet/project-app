import { Component, ElementRef, HostBinding, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { style, animate, AnimationBuilder, AnimationPlayer } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';
import { ConfigService } from '../../services/config.service';
import { Animations } from '../../animations';
import { NavigationService } from '../navigation/navigation.service';

@Component({
    selector   : 'theme-options',
    templateUrl: './theme-options.component.html',
    styleUrls  : ['./theme-options.component.scss'],
    animations : Animations
})
export class ThemeOptionsComponent implements OnInit, OnDestroy
{
    @ViewChild('openButton') openButton;
    @ViewChild('panel') panel;
    @ViewChild('overlay') overlay: ElementRef;

    public player: AnimationPlayer;
    Settings: any;

    onSettingsChanged: Subscription;

    @HostBinding('class.bar-closed') barClosed: boolean;

    constructor(
        private animationBuilder: AnimationBuilder,
        private Config: ConfigService,
        private navigationService: NavigationService,
        private renderer: Renderer2
    )
    {
        this.barClosed = true;

        this.onSettingsChanged =
            this.Config.onSettingsChanged
                .subscribe(
                    (newSettings) => {
                        this.Settings = newSettings;
                    }
                );

        // Get the nav model and add customize nav item
        // that opens the bar programmatically
        const navModel = this.navigationService.getNavigationModel();

        // navModel.push({
        //     'id'      : 'custom-function',
        //     'title'   : 'Custom Function',
        //     'type'    : 'group',
        //     'children': [
        //         {
        //             'id'      : 'customize',
        //             'title'   : 'Customize',
        //             'type'    : 'item',
        //             'icon'    : 'settings',
        //             'function': () => {
        //                 this.openBar();
        //             }
        //         }
        //     ]
        // });
    }

    ngOnInit()
    {
        this.renderer.listen(this.overlay.nativeElement, 'click', () => {
            this.closeBar();
        });
    }

    onSettingsChange()
    {
        this.Config.setSettings(this.Settings);
    }

    closeBar()
    {
        this.player =
            this.animationBuilder
                .build([
                    style({transform: 'translate3d(0,0,0)'}),
                    animate('400ms ease', style({transform: 'translate3d(100%,0,0)'}))
                ]).create(this.panel.nativeElement);

        this.player.play();

        this.player.onDone(() => {
            this.barClosed = true;
        });
    }

    openBar()
    {
        this.barClosed = false;

        this.player =
            this.animationBuilder
                .build([
                    style({transform: 'translate3d(100%,0,0)'}),
                    animate('400ms ease', style({transform: 'translate3d(0,0,0)'}))
                ]).create(this.panel.nativeElement);

        this.player.play();
    }

    ngOnDestroy()
    {
        this.onSettingsChanged.unsubscribe();
    }
}
