import { Component } from '@angular/core';
import { Animations } from '../../../../core/animations';

@Component({
    selector   : 'cards-docs',
    templateUrl: './cards.component.html',
    styleUrls  : ['./cards.component.scss'],
    animations : Animations
})
export class CardsDocsComponent
{
    card9Expanded = false;
    card10Expanded = false;

    constructor()
    {

    }
}
