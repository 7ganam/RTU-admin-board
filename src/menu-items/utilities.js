// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconBolt } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconBolt
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Stations',
    type: 'group',
    children: [

        {
            id: 'icons',
            title: 'Select Station',
            type: 'collapse',
            icon: icons.IconBolt,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Station 1',
                    type: 'item',
                    url: '/stations/1',
                    breadcrumbs: false
                },
                {
                    id: 'tabler-icons',
                    title: 'Station 2',
                    type: 'item',
                    url: '/stations/2',
                    breadcrumbs: false
                },
                {
                    id: 'tabler-icons',
                    title: 'Station 3',
                    type: 'item',
                    url: '/stations/3',
                    breadcrumbs: false
                },
                {
                    id: 'tabler-icons',
                    title: 'Station 4',
                    type: 'item',
                    url: '/stations/4',
                    breadcrumbs: false
                },
                {
                    id: 'tabler-icons',
                    title: 'Station 5',
                    type: 'item',
                    url: '/stations/5',
                    breadcrumbs: false
                },
                {
                    id: 'tabler-icons',
                    title: 'Station 6',
                    type: 'item',
                    url: '/stations/6',
                    breadcrumbs: false
                },
            ]
        }
    ]
};

export default utilities;
