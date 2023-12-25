import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import RootLayout from './pages/Root';
import Login, { action as loginAction } from './pages/Login';
import Profile, { loader as profileLoader } from './pages/Profile';
import Register from './pages/Register';
import { action as logoutAction } from './pages/Logout';


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
        element: <Login />,
        action: loginAction
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'profile',
        element: <Profile />,
        loader: profileLoader
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
