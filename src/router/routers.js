import React from 'react';
import Loadable from 'react-loadable';

const MyLoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div>Loading...</div>;
    } else if (error) { // Handle the error state
        console.log(error);
        return <div>Sorry, there was a problem loading the page.</div>;
    } else {
        return null;
    }
};

// console.log(AB_TEST);

export const routes = [
    {
        path: '/',
        component: Loadable({
            loader: () => import('Pages/home'),
            loading: MyLoadingComponent
        })
    },
    {
        path: '/home',
        component: Loadable({
            loader: () => import('Pages/home'),
            loading: MyLoadingComponent
        })
    },
    {
        path: '/myPage',
        component: Loadable({
            loader: () => import('Pages/myPage'),
            loading: MyLoadingComponent
        })
    },
    {
        path: '/myPage2',
        component: Loadable({
            loader: () => import('Pages/myPage2'),
            loading: MyLoadingComponent
        })
    }
];
