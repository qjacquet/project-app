import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { ChatService } from './chat.service';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { ChatStartComponent } from './chat-start/chat-start.component';
import { ChatChatsSidenavComponent } from './sidenavs/left/chats/chats.component';
import { ChatUserSidenavComponent } from './sidenavs/left/user/user.component';
import { ChatLeftSidenavComponent } from './sidenavs/left/left.component';
import { ChatRightSidenavComponent } from './sidenavs/right/right.component';
import { ChatContactSidenavComponent } from './sidenavs/right/contact/contact.component';

const routes: Routes = [
    {
        path     : '**',
        component: ChatComponent,
        children : [],
        resolve  : {
            chat: ChatService
        }
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ChatComponent,
        ChatViewComponent,
        ChatStartComponent,
        ChatChatsSidenavComponent,
        ChatUserSidenavComponent,
        ChatLeftSidenavComponent,
        ChatRightSidenavComponent,
        ChatContactSidenavComponent
    ],
    providers   : [
        ChatService
    ]
})
export class ChatModule
{
}
