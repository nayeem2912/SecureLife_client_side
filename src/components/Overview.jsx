import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const Overview = () => {
  // Dummy data (তুমি পরে backend theke data আনবা)
  const stats = {
    totalUsers: 1200,
    totalPolicies: 350,
    activeAgents: 25,
    claimSuccessRate: 92,
  };

  const pieData = [
    { name: "Term Life", value: 120 },
    { name: "Senior Plan", value: 80 },
    { name: "Family Plan", value: 90 },
    { name: "Child Plan", value: 60 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const barData = [
    { month: "Jan", policies: 20 },
    { month: "Feb", policies: 40 },
    { month: "Mar", policies: 35 },
    { month: "Apr", policies: 50 },
    { month: "May", policies: 70 },
    { month: "Jun", policies: 90 },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow-xl text-center">
          <div className="card-body">
            <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
            <p className="text-gray-500">Total Users</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl text-center">
          <div className="card-body">
            <h3 className="text-2xl font-bold">{stats.totalPolicies}</h3>
            <p className="text-gray-500">Total Policies</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl text-center">
          <div className="card-body">
            <h3 className="text-2xl font-bold">{stats.activeAgents}</h3>
            <p className="text-gray-500">Active Agents</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl text-center">
          <div className="card-body">
            <h3 className="text-2xl font-bold">{stats.claimSuccessRate}%</h3>
            <p className="text-gray-500">Claim Success Rate</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-lg font-semibold mb-4">Policy Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-lg font-semibold mb-4">Policies Issued (Monthly)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="policies" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
