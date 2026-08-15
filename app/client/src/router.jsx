import { createBrowserRouter, Route } from 'react-router-dom';

import ErrorPage from './layouts/errorpage/ErrorPage.jsx';
import RegularLayout from './layouts/regularlayout/RegularLayout.jsx';
import AdminLayout from './layouts/adminLayout/AdminLayout.jsx';
import Profiles from './pages/profiles/Profiles.jsx';
import TourList from './pages/tour-list/TourList.jsx';
import TourOverview from './pages/tour-overview/TourOverview.jsx';

const router = createBrowserRouter([
    {
        path: '/admin',
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'profiles/:id',
                element: <Profiles />,
            },
            {
                path: 'blogs',
                element: <h1>Blogs</h1>,
                children: [
                    {
                        path: ':id',
                        element: <h1>Blog with id</h1>,
                    },
                ],
            },
            {
                path: 'tours',
                element: <TourList />,

            },
            {
                path: 'tours/:id',
                element: <TourOverview />,
            },
            {
                path: 'impressum',
                element: <h1>Impressum</h1>,
            },
        ],
    },
    {
        path: '/',
        element: <RegularLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'profiles/:id',
                element: <Profiles />,
            },
            {
                path: 'blogs',
                element: <h1>Blogs</h1>,
                children: [
                    {
                        path: ':id',
                        element: <h1>Blog with id</h1>,
                    },
                ],
            },
            {
                path: 'tours',
                element: <TourList />,

            },
            {
                path: 'tours/:id',
                element: <TourOverview />,
            },
            {
                path: 'impressum',
                element: <h1>Impressum</h1>,
            },
        ],
    },
]);

export default router;
