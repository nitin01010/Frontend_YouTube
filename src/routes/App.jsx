import { createBrowserRouter } from "react-router-dom";

//  All Pages Here display
import Home from "../pages/Home";
import Layout from "../layout/Layout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Shorts from "../pages/Shorts";
import Subscriptions from "../pages/Subscriptions";
import VideoPlayer from "../pages/VideoPlayer";

const appRoute = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, element: <Home />
      },
      {
        path: 'login', element: <Login />
      },
      {
        path: 'signin', element:<Signup/>
      },
      {
        path: '/shorts', element:<Shorts/>
      },
      {
        path: '/Subscriptions', element:<Subscriptions/>
      },
      {
        path: '/watch/:id', element:<VideoPlayer/>
      },
    ]
  }
]);

export default appRoute

