import { Utils } from '../../../../core/utils';

export class List
{
    id: string;
    name: string;
    idCards: string[];

    constructor(list)
    {
        this.id = list.id || Utils.generateGUID();
        this.name = list.name || '';
        this.idCards = [];
    }
}
