import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

//Ca-re-lo


const Assets = Loader(lazy(() => import('src/content/applications/Assets')));
const BiomassOverview = Loader(lazy(() => import('src/content/applications/Biomass/Overview')));
const BiomassCreate = Loader(lazy(() => import('src/content/applications/Biomass/Create')));
const BiogasOverview = Loader(lazy(() => import('src/content/applications/Biogas/Overview')));
const BiogasCreate = Loader(lazy(() => import('src/content/applications/Biogas/Create')));
const BiocharOverview = Loader(lazy(() => import('src/content/applications/Biochar/Overview')));
const BiocharCreate = Loader(lazy(() => import('src/content/applications/Biochar/Create')));
const CRCOverview = Loader(lazy(() => import('src/content/applications/CRC/Overview')));
const CRCCreate = Loader(lazy(() => import('src/content/applications/CRC/Create')));
const EnergyOverview = Loader(lazy(() => import('src/content/applications/Energy/Overview')));
const EnergyCreate = Loader(lazy(() => import('src/content/applications/Energy/Create')));
const ActivityCreate = Loader(lazy(() => import('src/content/applications/Activity/Create')));

const ClaimCreate = Loader(lazy(() => import('src/content/applications/Claim/Create')));
const AttestationCreate = Loader(lazy(() => import('src/content/applications/Attestation/Create')));
const CreateEntity = Loader(lazy(() => import('src/content/applications/CreateEntity')));
const Canvas = Loader(lazy(() => import('src/content/applications/Canvas')));

// Pages

const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications

const Messenger = Loader(lazy(() => import('src/content/applications/Messenger')));
const Transactions = Loader(lazy(() => import('src/content/applications/Transactions')));
const UserProfile = Loader(lazy(() => import('src/content/applications/Users/profile')));
const UserSettings = Loader(lazy(() => import('src/content/applications/Users/settings')));

// Components

const Buttons = Loader(lazy(() => import('src/content/pages/Components/Buttons')));
const Modals = Loader(lazy(() => import('src/content/pages/Components/Modals')));
const Accordions = Loader(lazy(() => import('src/content/pages/Components/Accordions')));
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges = Loader(lazy(() => import('src/content/pages/Components/Badges')));
const Tooltips = Loader(lazy(() => import('src/content/pages/Components/Tooltips')));
const Avatars = Loader(lazy(() => import('src/content/pages/Components/Avatars')));
const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

// Status

const Status404 = Loader(lazy(() => import('src/content/pages/Status/Status404')));
const Status500 = Loader(lazy(() => import('src/content/pages/Status/Status500')));
const StatusComingSoon = Loader(lazy(() => import('src/content/pages/Status/ComingSoon')));
const StatusMaintenance = Loader(lazy(() => import('src/content/pages/Status/Maintenance')));


const routes: RouteObject[] = [
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <Overview />
      },
      {
        path: 'overview',
        element: (
          <Navigate
            to="/"
            replace
          />
        )
      },
      {
        path: '/status',
        children: [
          {
            path: '',
            element: (
              <Navigate
                to="404"
                replace
              />
            )
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          },
        ]
      },
      {
        path: '*',
        element: <Status404 />
      },
    ]
  },
  {
    path: '/carelo',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '',
        element: (
          <Navigate
            to="/carelo/assets"
            replace
          />
        )
      },
      {
        path: 'assets',
        element: <Assets />
      },
      {
        path: 'biomass',
        element: <BiomassOverview />
      },
      {
        path: 'energy',
        element: <EnergyOverview />
      },
      {
        path: 'energy/create',
        element: <EnergyCreate />
      },
      {
        path: 'biogas',
        element: <BiogasOverview />
      },
      {
        path: 'biogas/create',
        element: <BiogasCreate />
      },
      {
        path: 'biochar',
        element: <BiocharOverview />
      },
      {
        path: 'biochar/create',
        element: <BiocharCreate />
      },
      {
        path: 'crc',
        element: <CRCOverview />
      },
      {
        path: 'crc/create',
        element: <CRCCreate />
      },
      {
        path: 'activity/create',
        element: <ActivityCreate />
      },
      {
        path: 'biomass/create',
        element: <BiomassCreate />
      },
      {
        path: 'claim/create',
        element: <ClaimCreate />
      },
      {
        path: 'attestation/create',
        element: <AttestationCreate />
      },
      {
        path: 'create/entity',
        element: <CreateEntity />
      },
      {
        path: 'canvas',
        element: <Canvas />
      },
    ]
  },
  {
    path: '/dashboards',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '',
        element: (
          <Navigate
            to="/dashboards/crypto"
            replace
          />
        )
      },
      {
        path: 'crypto',
        element: <Crypto />
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },
  {
    path: '/management',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '',
        element: (
          <Navigate
            to="/management/transactions"
            replace
          />
        )
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: (
              <Navigate
                to="details"
                replace
              />
            )
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          },
        ]
      }
    ]
  },
  {
    path: '/components',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '',
        element: (
          <Navigate
            to="/components/buttons"
            replace
          />
        )
      },
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      },
    ]
  }
];

export default routes;
