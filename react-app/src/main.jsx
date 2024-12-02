import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/home-page';
import LoginPage from './components/login-page';
import SavedJobsPage from './components/saved-jobs-page'; 
import ErrorPage from './components/error-page';
import './styles/index.css';

function Main() {
  const [accessType, setAccessType] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage setAccessType={setAccessType} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/home",
      element: <HomePage accessType={accessType} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/saved-jobs", // New route for SavedJobsPage
      element: <SavedJobsPage />,
      errorElement: <ErrorPage />,
    },
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
