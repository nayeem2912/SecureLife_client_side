import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const fetchPolicies = async ({ queryKey }) => {
  const [_key, { category, page, search }] = queryKey;
  const res = await axios.get(`http://localhost:5000/policies`, {
    params: { category, page, limit: 9, search },
  });
  return res.data;
};

const usePolicies = ({ category = '', page = 1, search = '' }) => {
  return useQuery({
    queryKey: ['policies', { category, page, search }],
    queryFn: fetchPolicies,
    keepPreviousData: true,
  });
};

const Policies = () => {
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading, isError, error } = usePolicies({ category, page, search });
  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center text-red-600">Error: {error.message}</p>;

  const { policies, totalPages } = data;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Filter and Search */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <select
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded flex-1 "
          value={category}
        >
          <option className='text-black' value="">All Categories</option>
          <option className='text-black' value="Term Life">Term Life</option>
          <option className='text-black' value="Senior Plan">Senior Plan</option>
          <option className='text-black' value="Whole Life">Whole Life</option>
          <option className='text-black' value="Education Plan">Education Plan</option>
          <option className='text-black' value="Critical Illness">Critical Illness</option>
          <option className='text-black' value="Endowment">Endowment</option>
          <option className='text-black' value="Money Back">Money Back</option>
          <option className='text-black' value="ULIP">ULIP</option>
          <option className='text-black' value="Pension">Pension</option>
          <option className='text-black' value="Accidental Cover">Accidental Cover</option>
          <option className='text-black' value="Group Plan">Group Plan</option>
          <option className='text-black' value="Travel">Travel</option>
          <option className='text-black' value="Mortgage">Mortgage</option>
          <option className='text-black' value="Income Plan">Income Plan</option>
          <option className='text-black' value="Health">Health</option>
          <option className='text-black' value="Savings">Savings</option>
        </select>

        <input
          type="text"
          placeholder="Search policies..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border p-2  rounded flex-1"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies?.map((policy) => (
          <div key={policy._id} className="border bg-white p-4 rounded shadow hover:shadow-md">
            <img
              src={policy.image}
              alt={policy.title}
              className="w-full h-40 object-cover mb-3 rounded"
            />
            <h3 className="font-bold bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent text-lg">{policy.title}</h3>
            <p className="text-sm text-gray-600">{policy.category}</p>
            <p className="mt-2 text-gray-700 text-sm">
              {policy.shortDescription.length > 70
                ? policy.shortDescription.slice(0, 70) + '...'
                : policy.shortDescription}
            </p>
            <Link to={`/details/${policy._id}`}>
              <button className="mt-3 text-blue-600 underline">View Details</button>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 border rounded ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Policies;
