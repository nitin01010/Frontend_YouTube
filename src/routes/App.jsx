import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Layout from "../layout/Layout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Shorts from "../pages/Shorts";
import Subscriptions from "../pages/Subscriptions";
import VideoPlayer from "../pages/VideoPlayer";
import ErrorPage from "../pages/ErrorPage";



const appRoute = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, element: <Home /> 
      },
      {
        path: '/login', element: (
            <Login />
      )
      },
      {
        path: '/signin', element: <Signup />
      },
      {
        path: '/watch/:id', element: <VideoPlayer />
      },
      {
        path: '/shorts', element: <Shorts />
      },
      {
        path: '/Subscriptions', element: <Subscriptions />
      },
    ],
    errorElement:<ErrorPage />
  }
]);

export default appRoute

