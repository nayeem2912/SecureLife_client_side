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
      const res = await axios.get(`http://localhost:5000/applications/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Payment Status</h2>
      <table className="table w-full">
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
                <span className={`px-2 py-1 rounded text-white text-xs ${
                  policy.paymentStatus === "Paid" ? "bg-green-500" : "bg-red-500"
                }`}>
                  {policy.paymentStatus}
                </span>
              </td>
              <td>
                {policy.paymentStatus === "unpaid" && (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => navigate(`/payment/${policy._id}`)}
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
  );
};

export default PaymentStatus;
