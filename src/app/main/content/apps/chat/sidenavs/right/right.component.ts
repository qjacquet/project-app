import { Component, OnInit } from '@angular/core';
import { Animations } from '../../../../../../core/animations';
import { ChatService } from '../../chat.service';

@Component({
    selector   : 'chat-right-sidenav',
    templateUrl: './right.component.html',
    styleUrls  : ['./right.component.scss'],
    animations : Animations
})
export class ChatRightSidenavComponent implements OnInit
{
    view: string;

    constructor(private chatService: ChatService)
    {
        this.view = 'contact';
    }

    ngOnInit()
    {
        this.chatService.onRightSidenavViewChanged.subscribe(view => {
            this.view = view;
        });
    }

}
