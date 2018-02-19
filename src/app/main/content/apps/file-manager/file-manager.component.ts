import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FileManagerService } from './file-manager.service';
import { Animations } from '../../../../core/animations';

@Component({
    selector     : 'file-manager',
    templateUrl  : './file-manager.component.html',
    styleUrls    : ['./file-manager.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : Animations
})
export class FileManagerComponent implements OnInit
{
    selected: any;
    pathArr: string[];

    files: any;

    constructor(private fileManagerService: FileManagerService)
    {
    }

    ngOnInit()
    {
        this.fileManagerService.onFileSelected.subscribe(selected => {
            // this.selected = selected;
            // this.pathArr = selected.location.split('>');
        });
    }

}
