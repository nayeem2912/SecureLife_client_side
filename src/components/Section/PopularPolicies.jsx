import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const PopularPolicies = () => {
  const { data: policies = [], isLoading } = useQuery({
    queryKey: ["popularPolicies"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/popular-policies");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading popular policies...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center"> Popular Policies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.map((policy, idx) => (
          <div key={idx} className="card bg-base-100 shadow-xl border">
            <div className="card-body">
              <h3 className="text-xl font-bold">{policy.name}</h3>
              <p><strong>Coverage:</strong> {policy.coverage}</p>
              <p><strong>Duration:</strong> {policy.duration}</p>
              <p><strong>Purchased:</strong> {policy.purchaseCount} times</p>
              <div className="card-actions justify-end">
                <Link to={`/details/${(policy._id)}`} className="btn btn-sm bg-gradient-to-b from-sky-400 to-blue-600
 text-white">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPolicies;
