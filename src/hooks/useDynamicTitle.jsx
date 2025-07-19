import { useEffect } from "react";
import { useLocation } from "react-router";

// Optional: Map route paths to titles
const routeTitles = {
  "/": "Home - SecureLife",
  "/about": "About Us - SecureLife",
  "/blog": "Blog - SecureLife",
  "/profile": "Profile - SecureLife",
  "/login": "Login - SecureLife",
  "/register": "Register - SecureLife",
  "/faq": "FAQs - SecureLife",
  "/policies": "All Policies - SecureLife",
  "/dashboard": "DashBoard - SecureLife",
  "/term": "Term of use - SecureLife",
  "/privacy": "Privacy Policies - SecureLife",
  "/dashboard/manage-applications": "Manage Applications - SecureLife",
  "/dashboard/manage-policies": "Manage Policies - SecureLife",
  "/dashboard/manage-transactions": "Manage Transactions - SecureLife",
  "/dashboard/manage-users": "Manage Users - SecureLife",
  "/dashboard/assigned-customers": "Assigned Customers - SecureLife",
  "/dashboard/manage-blogs": "Manage Blogs - SecureLife",
  "/dashboard/policies-clearance": "Policies Clearance - SecureLife",
};

const useDynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    const title =
      routeTitles[currentPath] ||
      `SecureLife`; 

    document.title = title;
  }, [location.pathname]);
};

export default useDynamicTitle;
