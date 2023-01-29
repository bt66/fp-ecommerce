import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import pages
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import HelpDesk from './pages/HelpDesk';
import ErrorPage from './pages/ErrorPage';
import UserDashboard from './pages/UserDashboard';
import NewRelease from './pages/NewRelease';
import Upload from './pages/Upload';
import Coba from './pages/Coba.js';
import Payment from './pages/Payment';
import AdminPage from './pages/admin/AdminPage';
import AdminUserContent from './pages/admin/AdminUserContent';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/HelpDesk",
    element: <HelpDesk />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/userDashboard",
    element: <UserDashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/NewRelease",
    element: <NewRelease />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Upload",
    element: <Upload />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/test",
    element: <Coba />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/payment",
    element: <Payment />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/adminUserContent/:idUser",
    element: <AdminUserContent />,
    errorElement: <ErrorPage />,
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
  // <React.StrictMode>
  //   <App /> 
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
