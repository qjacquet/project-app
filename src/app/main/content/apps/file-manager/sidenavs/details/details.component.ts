import { Component, OnInit } from '@angular/core';
import { FileManagerService } from '../../file-manager.service';
import { Animations } from '../../../../../../core/animations';

@Component({
    selector   : 'file-manager-details-sidenav',
    templateUrl: './details.component.html',
    styleUrls  : ['./details.component.scss'],
    animations : Animations
})
export class FileManagerDetailsSidenavComponent implements OnInit
{

    selected: any;

    constructor(private fileManagerService: FileManagerService)
    {

    }

    ngOnInit()
    {
        this.fileManagerService.onFileSelected.subscribe(selected => {
            this.selected = selected;
        });
    }

}
