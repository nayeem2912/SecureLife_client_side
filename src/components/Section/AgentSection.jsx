import { useQuery } from "@tanstack/react-query";
import axios from "axios";



const AgentSection = () => {
  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["featuredAgents"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/agents/featured");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading agents...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent mb-8">Meet Our Agents</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent._id} className="bg-white rounded-xl shadow p-6 text-center">
            <img
              src={agent.
photoURL || "/default-avatar.png"}
              alt={agent.name}
              className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-xl text-gray-700 font-semibold mb-1">{agent.name}</h3>
            <p className="text-gray-500 text-sm">
              <strong>Experience:</strong> {agent.experience || "3+ years"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentSection;
