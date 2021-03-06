export class NavigationModel
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'applications',
                'title'   : 'Applications',
                'type'    : 'group',
                'icon'    : 'apps',
                'children': [
                    {
                        'id'      : 'dashboards',
                        'title'   : 'Dashboards',
                        'type'    : 'collapse',
                        'icon'    : 'dashboard',
                        'children': [
                            {
                                'id'   : 'project',
                                'title': 'Project',
                                'type' : 'item',
                                'url'  : '/apps/dashboards/project'
                            }
                        ]
                    },
                    {
                        'id'   : 'scrumboard',
                        'title': 'Scrumboard',
                        'type' : 'item',
                        'icon' : 'assessment',
                        'url'  : '/apps/scrumboard'
                    },
                    {
                        'id'   : 'chat',
                        'title': 'Chat',
                        'type' : 'item',
                        'icon' : 'assessment',
                        'url'  : '/apps/chat'
                    },
                    {
                        'id'   : 'file-manager',
                        'title': 'File Manager',
                        'type' : 'item',
                        'icon' : 'folder',
                        'url'  : '/apps/file-manager'
                    }
                ]
            }
        ];
    }
}

