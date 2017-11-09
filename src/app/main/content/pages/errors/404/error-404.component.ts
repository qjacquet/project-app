import { Component, OnInit } from '@angular/core';

import { ConfigService } from '../../../../../core/services/config.service';

@Component({
    selector   : 'error-404',
    templateUrl: './error-404.component.html',
    styleUrls  : ['./error-404.component.scss']
})
export class Error404Component implements OnInit
{
    constructor(
        private Config: ConfigService
    )
    {
        this.Config.setSettings({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });
    }

    ngOnInit()
    {
    }
}
