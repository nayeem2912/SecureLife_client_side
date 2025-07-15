import {
  createBrowserRouter,

} from "react-router";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Policies from "../pages/Policies";
import Agents from "../pages/Blog";
import FAQs from "../pages/FAQs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PolicyDetails from "../components/Details/PolicyDetails";
import QuotePage from "../pages/QuotePage";
import ApplicationForm from "../pages/ApplicationForm";
import Dashboard from "../layout/Dashboard";

import ManagePolicies from "../pages/AdminPage/ManagePolicies";
import ManageTransactions from "../pages/AdminPage/ManageTransactions";
import ManageUsers from "../pages/AdminPage/ManageUsers";
import AssignedCustomers from "../pages/AgentPage/AssignedCustomers";
import ManageBlogs from "../pages/AgentPage/ManageBlogs";
import PolicyClearance from "../pages/AgentPage/PolicyClearance";
import ClaimRequest from "../pages/CustomerPage/ClaimRequest";
import MyPolicies from "../pages/CustomerPage/MyPolicies";

import Blog from "../pages/Blog";
import BlogDetails from "../components/Details/BlogDetails";
import PaymentStatus from "../pages/CustomerPage/PaymentStatus";
import ManageApplications from "../pages/AdminPage/ManageApplications";

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
        path:'blog',
        Component:Blog,
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
      {
        path:'details/:id',
        Component:PolicyDetails,
      },
      {
        path:'blogs/:id',
        Component:BlogDetails,
      },
      {
        path:'get-quote/:id',
        Component: QuotePage,
      },
      {
        path:'application/:id',
        Component: ApplicationForm,
      },
    ]
  },
  {
    path:'/dashboard',
    element:<Dashboard></Dashboard>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
      path: "manage-applications",
      element: <ManageApplications></ManageApplications>
      },
      {
      path: "manage-policies",
      element: <ManagePolicies></ManagePolicies>
      },
      {
      path: "manage-transactions",
      element: <ManageTransactions></ManageTransactions>
      },
      {
      path: "manage-users",
      element: <ManageUsers></ManageUsers>
      },
      {
      path: "assigned-customers",
      element: <AssignedCustomers></AssignedCustomers>
      },
      {
      path: "manage-blogs",
      element: <ManageBlogs></ManageBlogs>
      },
      {
      path: "policies-clearance",
      element: <PolicyClearance></PolicyClearance>
      },
      {
      path: "claim",
      element: <ClaimRequest></ClaimRequest>
      },
      {
      path: "my-policies/:email",
      element: <MyPolicies></MyPolicies>
      },
      {
      path: "payment/:email",
      element: <PaymentStatus></PaymentStatus>
      },
      {
      path: "payment/:email",
      element: <PaymentStatus></PaymentStatus>
      },

    ]
  }
]);