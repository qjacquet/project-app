import { Component, OnInit } from '@angular/core';
import { Animations } from '../../../../../../core/animations';
import { ChatService } from '../../chat.service';

@Component({
    selector   : 'chat-left-sidenav',
    templateUrl: './left.component.html',
    styleUrls  : ['./left.component.scss'],
    animations : Animations
})
export class ChatLeftSidenavComponent implements OnInit
{
    view: string;

    constructor(private chatService: ChatService)
    {
        this.view = 'chats';
    }

    ngOnInit()
    {
        this.chatService.onLeftSidenavViewChanged.subscribe(view => {
            this.view = view;
        });
    }

}
