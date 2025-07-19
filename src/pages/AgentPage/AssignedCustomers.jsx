import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const AssignedCustomers = () => {
  const { user } = useAuth();
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["assignedCustomers", user?.email],
    queryFn: async () => {
      const res = await axios.get(`https://life-insurance-management-server.vercel.app/applications/assigned/${user.agentEmail}`);
      return res.data;
    },
  });

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await axios.patch(`https://life-insurance-management-server.vercel.app/applications/${appId}/status`, {
        status: newStatus,
      });
      Swal.fire( "Status changed successfully");
      refetch();
    } catch (error) {
      Swal.fire( "Status update failed" , error );
    }
  };

  const handleViewDetails = (application) => {
    setSelectedApp(application);
    setShowModal(true);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Assigned Customers</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Policy</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.policyName}</td>
                <td>
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
                    className="select w-30 select-sm select-bordered"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-md bg-gradient-to-b from-sky-400 to-blue-600
 text-white btn-outline"
                    onClick={() => handleViewDetails(app)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Customer Details */}
      {showModal && selectedApp && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold mb-3">Customer Application Info</h3>
            <p><strong>Name:</strong> {selectedApp.name}</p>
            <p><strong>Email:</strong> {selectedApp.email}</p>
            <p><strong>Policy:</strong> {selectedApp.policyName}</p>
            <p><strong>Address:</strong> {selectedApp.address}</p>
            <p><strong>NID:</strong> {selectedApp.nid}</p>
            <p><strong>Status:</strong> {selectedApp.status}</p>
            <p><strong>Coverage:</strong> {selectedApp.coverage} BDT</p>
            <p><strong>Duration:</strong> {selectedApp.duration} Years</p>
            <p><strong>Premium:</strong> {selectedApp.premium} BDT</p>
            <p><strong>Applied At:</strong> {new Date(selectedApp.appliedAt).toLocaleString()}</p>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => {
                  setSelectedApp(null);
                  setShowModal(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AssignedCustomers;
