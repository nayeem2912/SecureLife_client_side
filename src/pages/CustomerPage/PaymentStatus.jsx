import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const PaymentStatus = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: policies = [], isLoading } = useQuery({
    queryKey: ["paymentStatus", user?.email],
    queryFn: async () => {
      const res = await axios.get(`https://life-insurance-management-server.vercel.app/applications/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Payment Status</h2>
      <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Policy Name</th>
            <th>Premium Amount</th>
            <th>Payment Frequency</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy._id}>
              <td>{policy.policyName}</td>
              <td>{policy.premium} BDT</td>
              <td>monthly</td>
              
              <td>
                <span className={`px-2 py-1 rounded text-white text-sm ${
                  policy.paymentStatus === "Paid" ? "bg-green-500" : "bg-red-600"
                }`}>
                  {policy.paymentStatus}
                </span>
              </td>
              <td>
                {policy.paymentStatus === "unpaid" && (
                  <button
                    className="btn btn-md bg-gradient-to-b from-sky-400 to-blue-600
 text-white"
                    onClick={() => navigate(`/dashboard/pay/${policy._id}`)}
                  >
                    Pay Now
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default PaymentStatus;
