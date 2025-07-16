import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

const PopularPolicies = () => {
  const { data: policies = [], isLoading } = useQuery({
    queryKey: ["popularPolicies"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/popular-policies");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-8">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Popular Policies</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {policies.map((policy) => (
          <div
            key={policy._id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition duration-300"
          >
            <img
              src={policy.image || "/default-policy.jpg"}
              alt={policy.title}
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h3 className="text-xl font-semibold mb-2">{policy.title}</h3>
            <p>
              <strong>Coverage:</strong> {policy.coverage}
            </p>
            <p>
              <strong>Duration:</strong> {policy.duration}
            </p>
            <p className="text-sm text-gray-600 mb-3">
              <strong>Popularity:</strong> {policy.purchaseCount} Purchases
            </p>
            <Link
              to={`/details/${policy._id}`}
              className="inline-block text-blue-600 hover:underline text-sm font-medium"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPolicies;
