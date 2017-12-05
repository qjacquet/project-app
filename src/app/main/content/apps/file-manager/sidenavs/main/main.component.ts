import { Component, OnInit } from '@angular/core';

@Component({
    selector   : 'file-manager-main-sidenav',
    templateUrl: './main.component.html',
    styleUrls  : ['./main.component.scss']
})
export class FileManagerMainSidenavComponent implements OnInit
{
    selected: any;

    constructor()
    {

    }

    ngOnInit()
    {
    }

}
