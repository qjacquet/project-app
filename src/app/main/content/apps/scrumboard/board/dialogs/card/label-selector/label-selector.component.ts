import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ScrumboardService } from '../../../../scrumboard.service';
import { Utils } from '../../../../../../../../core/utils';
import { Animations } from '../../../../../../../../core/animations';

@Component({
    selector     : 'scrumboard-label-selector',
    templateUrl  : './label-selector.component.html',
    styleUrls    : ['./label-selector.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : Animations
})

export class ScrumboardLabelSelectorComponent implements OnInit, OnDestroy
{
    board: any;
    @Input('card') card: any;
    @Output() onCardLabelsChange = new EventEmitter();

    labelsMenuView = 'labels';
    selectedLabel: any;
    newLabel = {
        'id'   : '',
        'name' : '',
        'color': 'mat-blue-400-bg'
    };
    toggleInArray = Utils.toggleInArray;

    onBoardChanged: Subscription;

    constructor(
        private scrumboardService: ScrumboardService
    )
    {
    }

    ngOnInit()
    {
        this.onBoardChanged =
            this.scrumboardService.onBoardChanged
                .subscribe(board => {
                    this.board = board;
                });
    }

    cardLabelsChanged()
    {
        this.onCardLabelsChange.next();
    }

    onLabelChange()
    {
        this.scrumboardService.updateBoard();
    }

    addNewLabel()
    {
        this.newLabel.id = Utils.generateGUID();
        this.board.labels.push(Object.assign({}, this.newLabel));
        this.newLabel.name = '';
        this.labelsMenuView = 'labels';
    }

    ngOnDestroy()
    {
        this.onBoardChanged.unsubscribe();
    }

}
