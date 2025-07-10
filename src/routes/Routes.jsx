import {
  createBrowserRouter,

} from "react-router";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Policies from "../pages/Policies";
import Agents from "../pages/Agents";
import FAQs from "../pages/FAQs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        index:true,
        Component: Home,
      },
      {
        path:'policies',
        Component:Policies,
      },
      {
        path:'agent',
        Component:Agents,
      },
      {
        path:'faq',
        Component:FAQs,
      },
      {
        path:'faq',
        Component:FAQs,
      },
      {
        path:'login',
        Component:Login,
      },
      {
        path:'register',
        Component:Register,
      },
    ]
  },
  {
    path:'/dashboard',
    element:<Dashboard></Dashboard>,
    errorElement:<ErrorPage></ErrorPage>,
  }
]);