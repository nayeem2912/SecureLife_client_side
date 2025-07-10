import { useEffect, useState } from "react";
import { Link } from "react-router";

const PopularPolicies = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    fetch("/api/popular-policies") // তুমি এখানে তোমার API endpoint বসাবে
      .then((res) => res.json())
      .then((data) => {
        const top6 = data
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 6);
        setPolicies(top6);
      });
  }, []);

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 ">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent">
        Most Popular Policies
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {policies.map((policy) => (
          <div
            key={policy._id}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-5 hover:shadow-xl transition duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{policy.title}</h3>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Coverage:</span> ${policy.coverageAmount}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Duration:</span> {policy.termDuration} years
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-medium">Popularity:</span> {policy.popularity}+
            </p>
            <Link
              to={`/policy/${policy._id}`}
              className="inline-block mt-auto px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded hover:scale-105 transition-transform"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularPolicies;
