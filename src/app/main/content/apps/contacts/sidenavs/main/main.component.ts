import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../contacts.service';

@Component({
    selector   : 'contacts-main-sidenav',
    templateUrl: './main.component.html',
    styleUrls  : ['./main.component.scss']
})
export class ContactsMainSidenavComponent implements OnInit
{
    user: any;
    filterBy: string;

    constructor(private contactsService: ContactsService)
    {
        this.filterBy = 'all';
        this.contactsService.onUserDataChanged.subscribe(user => {
            this.user = user;
        });
    }

    ngOnInit()
    {
    }

    changeFilter(filter)
    {
        this.filterBy = filter;
        this.contactsService.onFilterChanged.next(this.filterBy);
    }
}
