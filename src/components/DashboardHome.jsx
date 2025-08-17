import { useEffect, useState } from "react";
import { FaUserShield, FaBriefcase, FaMoneyBill } from "react-icons/fa";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Overview from "./Overview";


const DashboardHome = () => {
  const {user} = useAuth();
  const { role, isLoading } = useRole();
  const [date, setDate] = useState("");

  

  useEffect(() => {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    setDate(today.toLocaleDateString("en-US", options));
  }, []);
  if (isLoading) return <div className="p-4">Loading...</div>;

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-b from-sky-400 to-blue-600 text-white p-6 rounded-2xl shadow-lg ">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.displayName || "User"}!
        </h1>
        <p className="text-lg">
          You are logged in as:{" "}
          {
            role === 'admin' && (<span className="capitalize font-semibold bg-white text-sky-500 px-2 py-1 rounded">
                Admin
          </span>)
          }
          {
            role === 'agent' && (<span className="capitalize font-semibold bg-white text-sky-500 px-2 py-1 rounded">
               Agent
          </span>)
          }
          {
            role === 'user' && (<span className="capitalize font-semibold bg-white text-sky-500 px-2 py-1 rounded">
                Customer
          </span>)
          }
          
        </p>
        <p className="mt-2 text-sm opacity-90">Today is {date}</p>
      </div>

      <div>
        <Overview></Overview>
      </div>
    </div>
  );
};

export default DashboardHome;
