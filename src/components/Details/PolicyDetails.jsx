
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPolicyDetails = async (id) => {
  const res = await axios.get(`http://localhost:5000/policies/${id}`);
  return res.data;
};

const PolicyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: policy, isLoading, error } = useQuery({
    queryKey: ["policyDetails", id],
    queryFn: () => fetchPolicyDetails(id),
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Error loading policy.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white shadow rounded p-6">
        <img
          src={policy.image}
          alt={policy.title}
          className="w-full h-full object-cover rounded mb-6"
        />
        <h1 className="text-3xl bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent font-bold mb-4">{policy.title}</h1>
        <p className="text-gray-600 mb-2">Category: {policy.category}</p>
        <p className="text-gray-700 mb-4">{policy.fullDescription}</p>

        <div className="mb-4">
          <h2 className="font-semibold text-gray-700 text-lg mb-2">Eligibility:</h2>
          <p className="text-gray-700">{policy.eligibility}</p>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold text-gray-700 text-lg mb-2">Benefits:</h2>
          <ul className="list-disc list-inside text-gray-700">
            {policy.benefits.map((benefit, i) => (
              <li key={i}>{benefit}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold text-gray-700 text-lg mb-2">Premium Calculation:</h2>
          <p className="text-gray-700">{policy.premiumCalculation}</p>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold text-gray-700 text-lg mb-2">Policy Details:</h2>
          <p className="text-gray-700">Term Length: {policy.termLength}</p>
          <p className="text-gray-700">Age: {policy.minAge} - {policy.maxAge}</p>
          <p className="text-gray-700">Coverage: {policy.coverage}</p>
          <p className="text-gray-700">Duration: {policy.duration}</p>
          <p className="text-gray-700">Base Premium: {policy.basePremium} BDT</p>
        </div>

        <button
          onClick={() => navigate(`/get-quote/${policy._id}`)}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Get Quote
        </button>
      </div>
    </div>
  );
};

export default PolicyDetails;
