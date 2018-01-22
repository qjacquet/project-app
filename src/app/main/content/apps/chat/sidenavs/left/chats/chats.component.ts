import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../chat.service';
import { ObservableMedia } from '@angular/flex-layout';
import { Animations } from '../../../../../../../core/animations';
import { MatSidenavHelperService } from '../../../../../../../core/directives/mat-sidenav-helper/mat-sidenav-helper.service';

@Component({
    selector   : 'chat-chats-sidenav',
    templateUrl: './chats.component.html',
    styleUrls  : ['./chats.component.scss'],
    animations : Animations
})
export class ChatChatsSidenavComponent implements OnInit
{
    user: any;
    chats: any[];
    contacts: any[];
    chatSearch: any;
    searchText = '';

    constructor(
        private chatService: ChatService,
        private MatSidenavService: MatSidenavHelperService,
        public media: ObservableMedia
    )
    {
        this.chatSearch = {
            name: ''
        };
    }

    ngOnInit()
    {
        this.user = this.chatService.user;
        this.chats = this.chatService.chats;
        this.contacts = this.chatService.contacts;

        this.chatService.onChatsUpdated.subscribe(updatedChats => {
            this.chats = updatedChats;
        });

        this.chatService.onUserUpdated.subscribe(updatedUser => {
            this.user = updatedUser;
        });
    }

    getChat(contact)
    {
        this.chatService.getChat(contact);

        if ( !this.media.isActive('gt-md') )
        {
            this.MatSidenavService.getSidenav('chat-left-sidenav').toggle();
        }
    }

    setUserStatus(status)
    {
        this.chatService.setUserStatus(status);
    }

    changeLeftSidenavView(view)
    {
        this.chatService.onLeftSidenavViewChanged.next(view);
    }

    logout()
    {
        console.log('logout triggered');
    }
}
