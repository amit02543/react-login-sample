import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ErrorPage from './pages/Error';
import HomePage, { loader as randomMusicLoader } from './pages/Home';
import RootLayout from './pages/Root';
import LoginPage, { action as loginAction } from './pages/Login';
import ProfilePage, { loader as profileLoader } from './pages/Profile';
import RegisterPage from './pages/Register';
import { action as logoutAction } from './pages/Logout';
import SearchPage from './pages/Search';
import SettingsPage from './pages/Settings';
import NewMusicPage, { loader as latestMusicLoader} from './pages/NewMusic';
import CollectionsPage, { loader as collectionMusicLoader } from './pages/Collections';
import LikesPage, { loader as likesMusicLoader } from './pages/Likes';
import CollectionDetailsPage, { loader as CollectionDetailsLoader } from './pages/CollectionDetails';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: '/root',
    children: [
      { 
        index: true, 
        element: <HomePage />,
        loader: randomMusicLoader 
      },
      {
        path: 'login',
        element: <LoginPage />,
        action: loginAction
      },
      {
        path: 'register',
        element: <RegisterPage />
      },
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: 'new-music',
        element: <NewMusicPage />,
        loader: latestMusicLoader
      },
      {
        path: 'collections',
        element: <CollectionsPage />,
        loader: collectionMusicLoader
      },
      {
        path: 'collections/:collectionName',
        element: <CollectionDetailsPage />,
        loader: CollectionDetailsLoader
      },
      {
        path: 'likes',
        element: <LikesPage />,
        loader: likesMusicLoader
      },
      {
        path: 'profile',
        element: <ProfilePage />,
        loader: profileLoader
      },
      {
        path: 'settings',
        element: <SettingsPage />
      },
      {
        path: 'logout',
        action: logoutAction
      }
    ],
  },
]);


function App() {

    const darkMode = localStorage.getItem('spotify-mode');
    const fontSize = localStorage.getItem('spotify-font-size');

    useEffect(() => {
        var bodyClasses = darkMode === 'true' ? 'dark' : '';
        bodyClasses = bodyClasses + ' ' +  (fontSize ? fontSize : 'fsNormal');

        document.body.className = bodyClasses;
    });
    
    return <RouterProvider router={router} />;
}

export default App;
