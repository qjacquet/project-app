import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Animations } from '../../../../core/animations';
import { User } from '../../../../core/models/user';
import { UserService } from '../../../../core/services/user.service';
import { Utils } from '../../../../core/utils';

@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : Animations
})
export class ProfileComponent implements OnInit
{

    currentUser: User;

    constructor(private userService: UserService)
    {

    }

    ngOnInit()
    {
        this.currentUser = Utils.getCurrentUser();
    }
}