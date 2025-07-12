import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MeetOurAgents = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    // ✅ Replace this with real API later
    setAgents([
      {
        id: 1,
        name: "Sarah Ahmed",
        experience: 5,
        specialties: ["Life Insurance", "Retirement Planning"],
        photo: "",
      },
      {
        id: 2,
        name: "Rafiq Islam",
        experience: 8,
        specialties: ["Health & Term Insurance", "Family Plans"],
        photo: "",
      },
      {
        id: 3,
        name: "Nasrin Jahan",
        experience: 6,
        specialties: ["Child Plans", "Investment-linked Policies"],
        photo: "",
      },
    ]);
  }, []);

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 ">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent mb-2">Meet Our Featured Agents</h2>
        <p className="">Expert advice from our experienced insurance agents</p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition duration-300"
          >
            <img
              src={agent.photo}
              alt={agent.name}
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-md"
            />
            <h3 className="text-xl font-semibold text-center text-slate-800">{agent.name}</h3>
            <p className="text-sm text-center text-gray-500 mb-2">{agent.experience}+ Years Experience</p>
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-600 mb-1 text-center">Specialties:</p>
              <ul className="text-sm text-center text-gray-700">
                {agent.specialties.map((sp, i) => (
                  <li key={i}>{sp}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MeetOurAgents;
