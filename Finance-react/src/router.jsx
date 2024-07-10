import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Register from './views/Register.jsx';
import Login from './views/Login.jsx';


const router = createBrowserRouter([
    {
        path:'/',
        element:<Register />
    },
    {
        path:'/login',
        element:<Login />
    }
])

export default router;
