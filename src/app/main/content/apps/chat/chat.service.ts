import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../../../core/services/http.service';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Utils } from '../../../../core/utils';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/user';

@Injectable()
export class ChatService implements Resolve<any>
{
    contacts: User[];
    chats: any[];
    user: User;
    onChatSelected = new BehaviorSubject<any>(null);
    onContactSelected = new BehaviorSubject<any>(null);
    onChatsUpdated = new Subject<any>();
    onUserUpdated = new Subject<any>();
    onLeftSidenavViewChanged = new Subject<any>();
    onRightSidenavViewChanged = new Subject<any>();

    constructor(
        private http: HttpService,
        private authService: AuthService
    )
    {
        this.user = authService.getCurrentUser();
    }

    /**
     * Get chat
     * @param contactId
     * @returns {Promise<any>}
     */
    getChat(contactId)
    {

        const chatItem = this.chats.filter(item => item.members.id === contactId)[0];

        console.log(chatItem);

        if (!chatItem)
        {
            this.createNewChat(contactId).then((newChats) => {
                this.getChat(contactId);
            });
            return;
        }

        this.onChatSelected.next(
            this.chats.filter(item => item.members.id === contactId)[0]);


        // const chatItem = this.chats.find((item) => {
        //     return item.members.id === contactId;
        // });

        /**
         * Create new chat, if it's not created yet.
         */
        // if ( !chatItem )
        // {
        //     this.createNewChat(contactId).then((newChats) => {
        //         this.getChat(contactId);
        //     });
        //     return;
        // }

        // return new Promise((resolve, reject) => {
        //     this.http.get(Utils.getApiUri('/chats/' + chatItem.id))
        //         .subscribe((response: any) => {
        //             const chat = response;

        //             const chatContact = this.contacts.find((contact) => {
        //                 return contact.id === contactId;
        //             });

        //             const chatData = {
        //                 chatId : chat.id,
        //                 dialog : chat.dialog,
        //                 contact: chatContact
        //             };

        //             this.onChatSelected.next({...chatData});

        //         }, reject);

        // });
    }

    /**
     * Create New Chat
     * @param contactId
     * @returns {Promise<any>}
     */
    createNewChat(contactId)
    {
        return new Promise((resolve, reject) => {

            const contact = this.contacts.filter(item => item._id === contactId)[0];

            const chatId = Utils.generateGUID();

            const chat = {
                id    : chatId,
                members : [],
                dialog: []
            };

            chat.members.push(
                {
                    id: this.user.id,
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    avatar: this.user.avatar,
                    _id: this.user.id
                },
                {
                    id: contact._id,
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    avatar: contact.avatar,
                    _id: contact._id
                }
            );


            /**
             * Post the created chat
             */
            this.http.post(Utils.getApiUri('/chats/'), {...chat})
                .subscribe((response: any) => {
                }, reject);
        });
    }

    /**
     * Select Contact
     * @param contact
     */
    selectContact(contact)
    {
        this.onContactSelected.next(contact);
    }

    /**
     * Set user status
     * @param status
     */
    setUserStatus(status)
    {
        this.user.status = status;
    }

    /**
     * Update user data
     * @param userData
     */
    updateUserData(userData)
    {
        this.http.post('api/chat-user/' + this.user.id, userData)
            .subscribe((response: any) => {
                    this.user = userData;
                }
            );
    }

    /**
     * Update the chat dialog
     * @param chatId
     * @param dialog
     * @returns {Promise<any>}
     */
    updateDialog(chatId, dialog): Promise<any>
    {
        return new Promise((resolve, reject) => {

            const newData = {
                id    : chatId,
                dialog: dialog
            };

            this.http.post('api/chat-chats/' + chatId, newData)
                .subscribe(updatedChat => {
                    resolve(updatedChat);
                }, reject);
        });
    }

    /**
     * The Chat App Main Resolver
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getContacts(),
                this.getChats()
            ]).then(
                ([contacts, chats]) => {
                    this.contacts = contacts;
                    this.chats = chats;
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get Contacts
     * @returns {Promise<any>}
     */
    getContacts(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get(Utils.getApiUri('/users/'))
                .subscribe((response: any) => {
                    resolve(<User[]>response
                        .filter(item => item._id !== this.authService
                            .getCurrentUser().id));
                }, reject);
        });
    }

    /**
     * Get Chats
     * @returns {Promise<any>}
     */
    getChats(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get(Utils.getApiUri('/chats/'))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
