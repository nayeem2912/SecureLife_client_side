// ManageApplications.jsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageApplications = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [agents, setAgents] = useState([]);

  const { data: applications = [], isLoading, refetch } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/applications");
      return res.data;
    },
  });

  useEffect(() => {
    axios.get("http://localhost:5000/users/agents").then((res) => setAgents(res.data));
  }, []);

  const handleAssignAgent = async (appId, agentEmail) => {
    try {
      const res = await axios.patch(`http://localhost:5000/applications/${appId}/assign`, {
        agentEmail,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Agent Assigned", "success");
        refetch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (appId) => {
    try {
      const res = await axios.patch(`http://localhost:5000/applications/${appId}/reject`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Rejected", "Application Rejected", "warning");
        refetch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewDetails = (app) => {
    setSelectedApp(app);
    document.getElementById("app-modal").showModal();
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Applications</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Policy</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.name}</td>
              <td>{app.email}</td>
              <td>{app.policyName}</td>
              <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${
                    app.status === "Approved"
                      ? "bg-green-500"
                      : app.status === "Rejected"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {app.status}
                </span>
              </td>
              <td className="space-x-2">
                <select
                  className="select select-sm"
                  onChange={(e) => handleAssignAgent(app._id, e.target.value)}
                  defaultValue=""
                >
                  <option disabled value="">
                    Assign Agent
                  </option>
                  {agents.map((agent) => (
                    <option key={agent._id} value={agent.email}>
                      {agent.name}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-sm bg-red-500 text-white"
                  onClick={() => handleReject(app._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => handleViewDetails(app)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <dialog id="app-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Application Details</h3>
          {selectedApp && (
            <div className="mt-2 space-y-2 text-left">
              <p><strong>Name:</strong> {selectedApp.name}</p>
              <p><strong>Email:</strong> {selectedApp.email}</p>
              <p><strong>Policy:</strong> {selectedApp.policyName}</p>
              <p><strong>Status:</strong> {selectedApp.status}</p>
              <p><strong>Address:</strong> {selectedApp.address}</p>
              <p><strong>NID:</strong> {selectedApp.nid}</p>
              <p><strong>Nominee:</strong> {selectedApp.nomineeName} ({selectedApp.nomineeRelation})</p>
              <p><strong>Health Disclosure:</strong> {selectedApp.healthInfo?.join(", ")}</p>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageApplications;
