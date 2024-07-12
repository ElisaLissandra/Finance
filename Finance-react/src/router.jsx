import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from './Components/DefaultLayout.jsx';
import GuestLayout from './Components/GuestLayout.jsx';
import Register from './views/Register.jsx';
import Login from './views/Login.jsx';
import Finance from './views/Finance.jsx';
import Salary from './views/Salary.jsx';
import Cost from './views/Cost.jsx';

const router = createBrowserRouter([
    {
        path:'/register',
        element:<Register />
    },
    {
        path:'/',
        element: <GuestLayout />,
        children: [
            {
                path: '/',
                element: <Login />
            }
        ]
    },

    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/finance',
                element: <Finance />
            },
            {
                path: '/salary',
                element: <Salary />
            },
            {
                path: '/cost',
                element: <Cost />
            }

        ]
    }
])

export default router;
