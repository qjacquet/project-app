import { Component } from '@angular/core';

@Component({
    selector   : 'google-maps-docs',
    templateUrl: './google-maps.component.html',
    styleUrls  : ['./google-maps.component.scss']
})
export class GoogleMapsDocsComponent
{
    lat = -34.397;
    lng = 150.644;

    constructor()
    {

    }
}
