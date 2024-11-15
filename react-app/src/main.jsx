import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/home-page';
import LoginPage from './components/login-page';
import ErrorPage from './components/error-page';
import useToken from './components/useToken';
import './styles/index.css'

function Main() {
  
  const { token, setToken } = useToken();

  // Check if the token exists; if not, show the login page
  if (!token) {
    return <LoginPage setToken={setToken} />;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>
    },
    {
      path: "/dashboard",
      element: <HomePage />,
      errorElement: <ErrorPage />
    },
    // {
    //   path: "/login",
    //   element: <LoginPage /> // Use this if you need nested routes
    // }
  ]);

  return <RouterProvider router={router} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

export default Main;
