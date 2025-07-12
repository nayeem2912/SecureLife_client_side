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
import ManageApplication from "../pages/AdminPage/ManageApplication";
import ManagePolicies from "../pages/AdminPage/ManagePolicies";
import ManageTransactions from "../pages/AdminPage/ManageTransactions";
import ManageUsers from "../pages/AdminPage/ManageUsers";
import AssignedCustomers from "../pages/AgentPage/AssignedCustomers";
import ManageBlogs from "../pages/AgentPage/ManageBlogs";
import PolicyClearance from "../pages/AgentPage/PolicyClearance";
import ClaimRequest from "../pages/CustomerPage/ClaimRequest";
import MyPolicies from "../pages/CustomerPage/MyPolicies";
import PaymentPage from "../pages/CustomerPage/PaymentPage";
import Blog from "../pages/Blog";

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
        path:'get-quote',
        Component: QuotePage,
      },
      {
        path:'application',
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
      element: <ManageApplication></ManageApplication>
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
      path: "manage-user",
      element: <ManageUsers></ManageUsers>
      },
      {
      path: "assigned-customer",
      element: <AssignedCustomers></AssignedCustomers>
      },
      {
      path: "manage-blog",
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
      path: "my-policies",
      element: <MyPolicies></MyPolicies>
      },
      {
      path: "payment",
      element: <PaymentPage></PaymentPage>
      },

    ]
  }
]);