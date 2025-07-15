import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageApplications = () => {
  const [selectedAgents, setSelectedAgents] = useState({});
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectId, setRejectId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);

  const {
    data: applications = [],
    isLoading: appsLoading,
    refetch: refetchApplications,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/applications");
      return res.data;
    },
  });

  const {
    data: agents = [],
    isLoading: agentsLoading,
    error: agentsError,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/users/agents");
      return res.data;
    },
  });

  const handleAssignAgent = async (appId) => {
    const selectedEmail = selectedAgents[appId];
    if (!selectedEmail) {
      return Swal.fire("Error", "Please select an agent", "error");
    }

    try {
      await axios.patch(`http://localhost:5000/applications/${appId}/assign`, {
        agentEmail: selectedEmail,
      });
      Swal.fire("Success", "Agent assigned successfully", "success");
      refetchApplications();
    } catch (err) {
      Swal.fire("Error", "Failed to assign agent", err.message || err);
    }
  };

  const handleReject = async () => {
    if (!rejectReason) {
      return Swal.fire("Error", "Please provide rejection reason", "error");
    }

    try {
      await axios.patch(
        `http://localhost:5000/applications/${rejectId}/reject`,
        {
          reason: rejectReason,
        }
      );
      Swal.fire("Rejected", "Application rejected", "success");
      setShowRejectModal(false);
      setRejectReason("");
      refetchApplications();
    } catch (err) {
      Swal.fire("Error", "Failed to reject", err.message || err);
    }
  };

  if (appsLoading || agentsLoading)
    return <p className="text-center">Loading...</p>;
  if (agentsError)
    return <p className="text-center text-red-500">Failed to load agents</p>;

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Applications</h2>
      <table className="table w-full table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Applicant</th>
            <th>Policy</th>
            <th>Applied At</th>
            <th>Status</th>
            <th>Agent</th>
            <th>Assign</th>
            <th>Reject</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => {
            const assignedAgent = app.agentEmail
              ? agents.find(
                  (agent) =>
                    agent.email.trim().toLowerCase() ===
                    app.agentEmail.trim().toLowerCase()
                )
              : null;

            return (
              <tr key={app._id}>
                <td>{index + 1}</td>
                <td>
                  {app.name}
                  <br />
                  <span className="text-xs text-gray-500">{app.email}</span>
                </td>
                <td>{app.policyName}</td>
                <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      app.status === "Approved"
                        ? "bg-green-500"
                        : app.status === "Rejected"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td>
                  {assignedAgent ? (
                    <div>
                      <div>{assignedAgent.name}</div>
                      <div className="text-xs text-gray-500">
                        {assignedAgent.email}
                      </div>
                    </div>
                  ) : (
                    <em className="text-gray-400 italic">No Agent Assigned</em>
                  )}
                </td>
                <td>
                  <select
                    className="select select-bordered w-40 max-w-xs"
                    onChange={(e) =>
                      setSelectedAgents({
                        ...selectedAgents,
                        [app._id]: e.target.value,
                      })
                    }
                    value={selectedAgents[app._id] || ""}
                  >
                    <option value="">Select Agent</option>
                    {agents.map((agent) => (
                      <option key={agent._id} value={agent.email}>
                        {agent.name} ({agent.email})
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn btn-xs border-none bg-gradient-to-b from-sky-400 to-blue-600
 text-white w-full mt-2"
                    onClick={() => handleAssignAgent(app._id)}
                  >
                    Assign
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-xs bg-red-600 text-white w-full"
                    onClick={() => {
                      setRejectId(app._id);
                      setShowRejectModal(true);
                    }}
                  >
                    Reject
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-xs border-none bg-gradient-to-b from-sky-400 to-blue-600
 text-white btn-outline w-full"
                    onClick={() => setSelectedApp(app)}
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Reject Modal */}
      {showRejectModal && (
        <dialog id="rejectModal" open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Reject Application</h3>
            <textarea
              placeholder="Reason for rejection"
              className="textarea textarea-bordered w-full mt-3"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            ></textarea>
            <div className="modal-action">
              <form method="dialog" className="flex gap-2">
                <button
                  className="btn"
                  onClick={() => setShowRejectModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleReject}
                  className="btn btn-error text-white"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}

      {/* View Modal */}
      {selectedApp && (
        <dialog id="viewAppModal" open className="modal">
          <div className="modal-box max-w-lg">
            <h3 className="text-lg font-bold mb-2">Application Details</h3>
            <p>
              <strong>Name:</strong> {selectedApp.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedApp.email}
            </p>
            <p>
              <strong>Policy:</strong> {selectedApp.policyName}
            </p>
            <p>
              <strong>Coverage:</strong> {selectedApp.coverage}
            </p>
            <p>
              <strong>Duration:</strong> {selectedApp.duration}
            </p>
            <p>
              <strong>Premium:</strong> {selectedApp.premium} BDT
            </p>
            <p>
              <strong>Status:</strong> {selectedApp.status}
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={() => setSelectedApp(null)}>
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageApplications;
