import { NgModule } from '@angular/core';

import { KeysPipe } from './keys.pipe';
import { GetByIdPipe } from './getById.pipe';
import { HtmlToPlaintextPipe } from './htmlToPlaintext.pipe';
import { FilterPipe } from './filter.pipe';
import { CamelCaseToDashPipe } from './camelCaseToDash.pipe';
import { SearchPipe } from './search.pipe';

@NgModule({
    declarations: [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        SearchPipe

    ],
    imports     : [],
    exports     : [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        SearchPipe
    ]
})

export class PipesModule
{

}
