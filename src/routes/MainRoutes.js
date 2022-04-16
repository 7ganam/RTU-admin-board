import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsLowVoltageStationPage = Loadable(lazy(() => import('views/utilities/LowVoltageStationPage')));
const UtilsMediumVoltageStationPage = Loadable(lazy(() => import('views/utilities/MediumVoltageStationPage')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/low-voltage-stations/:id',
            element: <UtilsLowVoltageStationPage />
        },
        {
            path: '/medium-voltage-stations/:id',
            element: <UtilsMediumVoltageStationPage />
        }
    ]
};

export default MainRoutes;
