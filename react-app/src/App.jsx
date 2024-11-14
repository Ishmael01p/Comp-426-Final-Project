// import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoginPage from './components/login-page';
import './styles/app.css'
import HomePage from './components/home-page';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken))
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString)
  return userToken?.token
}

function App() {
  const token = getToken
  // const [token, setToken] = useState();

  if (!token) {
    return <LoginPage setToken={setToken} />;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      children: [
        { path: 'home', element: <HomePage /> },
      ],
    },
  ])
  return (
    <RouterProvider router={router}>
      <Outlet />
    </RouterProvider>
  );
}


export default App
