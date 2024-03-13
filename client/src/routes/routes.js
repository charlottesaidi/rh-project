import { lazy } from 'react';

const Main = lazy(() => import('../pages/Main'));
const Home = lazy(() => import('../pages/Home'));
const AddEmployee = lazy(() => import('../pages/AddEmployee'));
const AllPosts = lazy(() => import('../pages/AllPosts'));
const Dashboard = lazy(() => import('../pages/Dashboard'));

const routes = {
    main: {
        path: '',
        element: Main
    },
    home: {
        path: 'home',
        element: Home
    },
    dashboard: {
        path: 'dashboard',
        element: Dashboard,
    },
    addoffer: {
        path: 'addoffer',
        element: AddEmployee
    },
    allposts: {
        path: 'posts',
        element: AllPosts
    },
    invalid: {
        path: '/*',
        element: Main
    },
}

export { routes };