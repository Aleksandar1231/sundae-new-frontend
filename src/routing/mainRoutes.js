import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Home = lazy(() => import("../pages/Home"));
const Bonds = lazy(() => import("../pages/Bonds"));
const Boardrooms = lazy(() => import("../pages/Boardrooms"));
const Farm = lazy(() => import("../pages/Farm"));
const Freezer = lazy(() => import("../pages/Freezer"));
const SundaeNodes = lazy(() => import("../pages/SundaeNodes"));
const Treasury = lazy(() => import("../pages/Treasury"));
const KoCPage = lazy(() => import("../pages/LastManStanding"));
const Leaderboard = lazy(() => import("../pages/Leaderboard"));
const Unlock = lazy(() => import("../pages/Unlock"))

export const routes = [
    {
        path: '/',
        element: <Home />,
        exact: true,
        role: [0, 1]
    },
    {
        path: '/bonds',
        element: <Bonds />,
        exact: false,
        role: [0, 1]
    },
    {
        path: '/boardrooms',
        element: <Boardrooms />,
        exact: false,
        role: [0, 1]
    },
    {
        path: '/farm',
        element: <Farm />,
        exact: false,
        role: [0, 1]
    },
    {
        path: '/freezer',
        element: <Freezer />,
        exact: false,
        role: [0, 1]
    },
    {
        path: '/nodes/FudgeNode',
        element: <SundaeNodes />,
        exact: false,
        role: [0, 1]
    },
    {
        path: '/lastmanstanding',
        element: <KoCPage />,
        exact: false,
        role: [0, 1]
    },
    {
        path: '/leaderboard',
        element: <Leaderboard />,
        exact: false,
        role: [0, 1]
    },
    {
        path: '/treasury',
        element: <Treasury />,
        exact: false,
        role: [0, 1]
    },
    {
        path: '/unlock',
        element: <Unlock />,
        exact: false,
        role: [0]
    },
    {
        component: () => <Navigate replace to="/unlock" />,
        role: [0]
    },
    {
        component: () => <Navigate replace to="/farm" />,
        role: [1]
    }
]
