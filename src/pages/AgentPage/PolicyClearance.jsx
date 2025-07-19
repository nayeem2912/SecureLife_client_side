import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const PolicyClearance = () => {
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [policyDetails, setPolicyDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { data: claims = [], isLoading, refetch } = useQuery({
    queryKey: ["claims"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/claims");
      return res.data;
    },
  });

  const fetchPolicyDetails = async (policyId) => {
    try {
      const res = await axios.get(`http://localhost:5000/applications/${policyId}`);
      setPolicyDetails(res.data);
      toast(res.data)
    } catch (err) {
      toast("Failed to fetch policy", err);
    }
  };

  const handleViewDetails = async (claim) => {
    setSelectedClaim(claim);
    await fetchPolicyDetails(claim.policyId);
    setShowModal(true);
  };

  const handleApprove = async () => {
    try {
      await axios.patch(`http://localhost:5000/claims/${selectedClaim._id}/approve`);
      Swal.fire("Success", "Claim Approved", "success");
      setShowModal(false);
      refetch();
    } catch (err) {
      Swal.fire("Error", "Failed to approve claim", "error", err);
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Policy Clearance Requests</h2>
      <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Policy Name</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim._id}>
              <td>{claim.policyName}</td>
              <td>{claim.email}</td>
              <td>{claim.amount || "--"}</td>
              <td>
                <span
                  className={`badge ${claim.status === "Approved" ? "badge-success" : "badge-warning"}`}
                >
                  {claim.status}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-md bg-gradient-to-b from-sky-400 to-blue-600
 text-white btn-info"
                  onClick={() => handleViewDetails(claim)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       </div>
      {/* Modal */}
      {showModal && policyDetails && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Policy Details</h3>
            <p><strong>Policy Name:</strong> {policyDetails.policyName}</p>
            <p><strong>Coverage:</strong> {policyDetails.coverage}</p>
            <p><strong>Duration:</strong> {policyDetails.duration}</p>
            <p><strong>Premium:</strong> {policyDetails.premium} BDT</p>
            <p><strong>Status:</strong> {policyDetails.status}</p>
            <div className="modal-action">
              <form method="dialog" className="flex gap-2">
                <button className="btn" onClick={() => setShowModal(false)}>Close</button>
                {selectedClaim.status === "Pending" && (
                  <button className="btn bg-gradient-to-b from-sky-400 to-blue-600
 text-white " onClick={handleApprove}>
                    Approve Claim
                  </button>
                )}
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PolicyClearance;
