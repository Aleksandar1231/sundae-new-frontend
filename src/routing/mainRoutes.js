import React, {lazy} from 'react'
import {Redirect} from 'react-router-dom'

const Home = lazy(() => import("../pages/Home"));
const Bonds = lazy(() => import("../pages/Bonds"));
const Boardrooms = lazy(() => import("../pages/Boardrooms"));
const Farm = lazy(() => import("../pages/Farm"));
const Treasury = lazy(() => import("../pages/Treasury"));
const Unlock = lazy(() => import("../pages/Unlock"))

export const routes = [
    {
        path: '/',
        component: Home,
        exact: true,
        role: [0, 1]
    },
    {
        path: '/bonds',
        component: Bonds,
        exact: false,
        role: [0, 1]
    },
    {
        path: '/boardrooms',
        component: Boardrooms,
        exact: false,
        role: [0, 1]
    },
    {
        path: '/farm',
        component: Farm,
        exact: false,
        role: [0, 1]
    },
    {
        path: '/treasury',
        component: Treasury,
        exact: false,
        role: [0, 1]
    },
    {
        path: '/unlock',
        component: Unlock,
        exact: false,
        role: [0]
    },
    {
        component: () => <Redirect to="/unlock"/>,
        role: [0]
    },
    {
        component: () => <Redirect to="/farm"/>,
        role: [1]
    }
]
