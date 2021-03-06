import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ConfigService } from '../../core/services/config.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { Utils } from '../../core/utils';

import { User } from '../../core/models/user';

@Component({
    selector   : 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss']
})

export class ToolbarComponent
{
    currentUser: User;
    userStatusOptions: any[];
    languages: any;
    selectedLanguage: any;
    showLoadingBar: boolean;
    horizontalNav: boolean;

    constructor(
        private router: Router,
        private Config: ConfigService,
        private translate: TranslateService,
        private authService: AuthService
    )
    {
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon' : 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon' : 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon' : 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                'id'   : 'en',
                'title': 'English',
                'flag' : 'us'
            },
            {
                'id'   : 'fr',
                'title': 'French',
                'flag' : 'fr'
            }
        ];

        this.selectedLanguage = this.getLanguageOrDefault();

        router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationStart )
                {
                    this.showLoadingBar = true;
                }
                if ( event instanceof NavigationEnd )
                {
                    this.showLoadingBar = false;
                }
            });

        this.Config.onSettingsChanged.subscribe((settings) => {
            this.horizontalNav = settings.layout.navigation === 'top';
        });

        this.currentUser = authService.getCurrentUser();
    }

    search(value)
    {
        // Do your search here...
        console.log(value);
    }

    getLanguageOrDefault(){
        return this.languages.filter(item => item.id == Utils.getLanguage())[0] || this.languages();
    }

    setLanguage(lang)
    {
        console.log(lang);
        // Set the selected language for toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this.translate.use(lang.id);

        // Store in localstorage
        Utils.setLanguage(lang.id);
    }

    profile()
    {
        this.router.navigate(['profile']);
    }

    logout()
    {
        this.authService.logout(true);
    }
}
