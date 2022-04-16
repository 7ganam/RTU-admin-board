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
            title: 'Low voltage',
            type: 'collapse',
            icon: icons.IconBolt,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Station 1',
                    type: 'item',
                    url: '/low-voltage-stations/1',
                    breadcrumbs: false
                },
                {
                    id: 'tabler-icons',
                    title: 'Station 2',
                    type: 'item',
                    url: '/low-voltage-stations/2',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'icons',
            title: 'Medium voltage',
            type: 'collapse',
            icon: icons.IconBolt,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Station 1',
                    type: 'item',
                    url: '/medium-voltage-stations/1',
                    breadcrumbs: false
                },
                {
                    id: 'tabler-icons',
                    title: 'Station 2',
                    type: 'item',
                    url: '/medium-voltage-stations/2',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default utilities;
