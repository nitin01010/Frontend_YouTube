import { createBrowserRouter } from "react-router-dom";

//  All Pages Here display
import Home from "../pages/Home";
import Layout from "../layout/Layout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

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
    ]
  }
]);

export default appRoute

