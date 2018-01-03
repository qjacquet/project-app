import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Animations } from '../../../../core/animations';
import { User } from '../../../../core/models/user';
import { Utils } from '../../../../core/utils';
import { AuthService } from '../../../../core/services/auth.service';

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

    constructor(
        private authService: AuthService
    )
    {
        this.currentUser = authService.getCurrentUser();
    }

    ngOnInit()
    {
        
    }
}
