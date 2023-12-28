import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import RootLayout from './pages/Root';
import LoginPage, { action as loginAction } from './pages/Login';
import ProfilePage, { loader as profileLoader } from './pages/Profile';
import RegisterPage from './pages/Register';
import { action as logoutAction } from './pages/Logout';
import SearchPage from './pages/Search';
import SettingsPage from './pages/Settings';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: '/root',
    children: [
      { 
        index: true, 
        element: <HomePage /> 
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
    return <RouterProvider router={router} />;
}

export default App;
