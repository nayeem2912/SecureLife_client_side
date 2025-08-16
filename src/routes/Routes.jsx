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
import MyPolicies from "../pages/CustomerPage/MyPolicies";
import Blog from "../pages/Blog";
import BlogDetails from "../components/Details/BlogDetails";
import PaymentStatus from "../pages/CustomerPage/PaymentStatus";
import ManageApplications from "../pages/AdminPage/ManageApplications";
import PayPolicy from "../pages/CustomerPage/PayPolicy";
import ClaimRequestPage from "../pages/CustomerPage/ClaimRequestPage";
import UserProfile from "../pages/UserProfile";
import DashboardHome from "../components/DashboardHome";
import PrivateRouter from "../contexts/PrivateRouter";
import AboutUs from "../pages/AboutUs";
import TermsOfUse from "../pages/TermsOfUse";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import ManageBlog from "../pages/AdminPage/ManageBlog";
import ProfileCard from "../components/ProfileCard";


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
        path:'about',
        Component: AboutUs,
      },
      {
        path:'term',
        Component: TermsOfUse,
      },
      {
        path:'privacy',
        Component: PrivacyPolicy,
      },
      {
        path:'profile',
       element: <PrivateRouter> <UserProfile></UserProfile> </PrivateRouter>
      },
      {
        path:'details/:id',
        element: <PrivateRouter><PolicyDetails></PolicyDetails> </PrivateRouter> ,
      },
      {
        path:'blogs/:id',
        Component:BlogDetails,
      },
      {
        path:'get-quote/:id',
        element: <PrivateRouter> <QuotePage></QuotePage> </PrivateRouter>
      },
      {
        path:'application/:id',
        element: <PrivateRouter> <ApplicationForm></ApplicationForm>   </PrivateRouter>
      },
    ]
  },
  {
    path:'/dashboard',
    element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter> ,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
       index:true,
       element: <PrivateRouter> <DashboardHome></DashboardHome></PrivateRouter>  
      },
      {
      path: "manage-applications",
      element: <PrivateRouter> <ManageApplications></ManageApplications> </PrivateRouter>
      },
      {
      path: "manage-policies",
      element: <PrivateRouter><ManagePolicies></ManagePolicies></PrivateRouter> 
      },
      {
      path: "manage-transactions",
      element: <PrivateRouter><ManageTransactions></ManageTransactions></PrivateRouter> 
      },
      {
      path: "manage-users",
      element:<PrivateRouter><ManageUsers></ManageUsers></PrivateRouter>
       
      },
      {
      path: "assigned-customers",
      element: <PrivateRouter><AssignedCustomers></AssignedCustomers></PrivateRouter> 
      },
      {
      path: "manage-blogs",
      element: <PrivateRouter><ManageBlogs></ManageBlogs></PrivateRouter> 
      },
      {
      path: "manage-blog",
      element: <PrivateRouter><ManageBlog></ManageBlog></PrivateRouter> 
      },
      {
      path: "policies-clearance",
      element: <PrivateRouter><PolicyClearance></PolicyClearance></PrivateRouter> 
      },
      {
      path: "claim-request/:email",
      element: <PrivateRouter><ClaimRequestPage></ClaimRequestPage></PrivateRouter> 
      },
      {
      path: "my-policies/:email",
      element: <PrivateRouter><MyPolicies></MyPolicies></PrivateRouter> 
      },
      {
      path: "payment/:email",
      element: <PrivateRouter><PaymentStatus></PaymentStatus></PrivateRouter> 
      },
      {
        path:"pay/:id",
        element: <PrivateRouter><PayPolicy></PayPolicy></PrivateRouter> 
      },
      {
        path:"profile/:email",
        element: <PrivateRouter><ProfileCard></ProfileCard></PrivateRouter> 
      }

    ]
  }
]);