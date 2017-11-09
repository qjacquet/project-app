import { Component, OnInit } from '@angular/core';
import { Animations } from '../../../../../core/animations';

@Component({
    selector   : 'chat-start',
    templateUrl: './chat-start.component.html',
    styleUrls  : ['./chat-start.component.scss'],
    animations : Animations
})
export class ChatStartComponent implements OnInit
{

    constructor()
    {
    }

    ngOnInit()
    {
    }

}
