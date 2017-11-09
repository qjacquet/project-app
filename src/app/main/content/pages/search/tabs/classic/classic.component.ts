import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../search.service';

@Component({
    selector   : 'search-classic',
    templateUrl: './classic.component.html',
    styleUrls  : ['./classic.component.scss']
})
export class SearchClassicComponent implements OnInit
{
    classic: any;

    constructor(private searchService: SearchService)
    {
        this.searchService.classicOnChanged.subscribe(classic => {
            this.classic = classic;
        });
    }

    ngOnInit()
    {

    }
}
