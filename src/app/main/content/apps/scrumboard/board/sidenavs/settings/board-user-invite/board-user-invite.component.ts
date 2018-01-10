import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScrumboardService } from '../../../../scrumboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../../../../../../core/models/user';

@Component({
    selector   : 'scrumboard-board-user-invite',
    templateUrl: './board-user-invite.component.html',
    styleUrls  : ['./board-user-invite.component.scss']
})
export class ScrumboardBoardUserInviteComponent implements OnInit, OnDestroy
{
    inviteForm: FormGroup;
    inviteFormErrors: any;

    board: any;
    onBoardChanged: Subscription;
    users: User[];

    constructor(
        private scrumboardService: ScrumboardService,
        private formBuilder: FormBuilder
    )
    {
        this.inviteFormErrors = {
            email   : {},
            message: {},
            global  : {}
        };

        scrumboardService
            .getUsers()
            .then((data) => {
                console.log(data);
                this.users = data;
            })
            .catch((ex) => {
                console.log(ex);
            })
    }

    ngOnInit()
    {
        this.onBoardChanged =
            this.scrumboardService.onBoardChanged
                .subscribe(board => {
                    this.board = board;
                });

        this.inviteForm = this.formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            message: ['', Validators.nullValidator]
        });

        this.inviteForm.valueChanges.subscribe(() => {
            this.onInviteFormValuesChanged();
        });
    }

    onInviteFormValuesChanged()
    {
        for ( const field in this.inviteFormErrors )
        {
            if ( !this.inviteFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.inviteFormErrors[field] = {};

            // Get the control
            const control = this.inviteForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.inviteFormErrors[field] = control.errors;
            }
        }
    }

    getMemberFormat(user: User)
    {
        return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            owner: false
        }
    }

    addMember(user: User)
    {
        this.board.members.push(this.getMemberFormat(user));
        this.scrumboardService.updateBoard();
    }

    deleteMember(user: User)
    {
        this.board.members = this.board.members.filter(item => item.id !== user._id);
        this.scrumboardService.updateBoard();
    }

    ngOnDestroy()
    {
        this.onBoardChanged.unsubscribe();
    }
}
