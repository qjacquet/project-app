import { Component } from '@angular/core';
import { SplashScreenService } from './core/services/splash-screen.service';
import { TranslateService } from '@ngx-translate/core';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { Utils } from './core/utils';

@Component({
    selector   : 'root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    constructor(
        private SplashScreen: SplashScreenService,
        private translate: TranslateService,
        private swUpdate: SwUpdate
    )
    {
        // Add languages
        this.translate.addLangs(['en', 'fr']);

        // Set the default language
        this.translate.setDefaultLang('en');

        // Use a language
        let browserLang = Utils.getLanguage();
        this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }

    ngOnInit() {

        if (this.swUpdate.isEnabled) {

            this.swUpdate.available.subscribe(() => {

                if (confirm("New version available. Load New Version?")) {

                    window.location.reload();
                }
            });
        }        
    }


}
