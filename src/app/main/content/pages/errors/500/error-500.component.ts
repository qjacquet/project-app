import { Component, OnInit } from '@angular/core';

import { ConfigService } from '../../../../../core/services/config.service';

@Component({
    selector   : 'error-500',
    templateUrl: './error-500.component.html',
    styleUrls  : ['./error-500.component.scss']
})
export class Error500Component implements OnInit
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
