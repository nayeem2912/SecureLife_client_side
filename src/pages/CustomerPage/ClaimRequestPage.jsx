import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const ClaimRequestPage = () => {
  const { user } = useAuth();
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showClaimModal, setShowClaimModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch approved applications
  const {
    data: approvedPolicies = [],
    isLoading,
    refetch: refetchApplications
  } = useQuery({
    queryKey: ["approvedApplications", user?.email],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/applications/user/${user.email}`);
      return res.data.filter((app) => app.status === "Approved");
    },
    enabled: !!user?.email
  });

  // Fetch claims
  const {
    data: claims = [],
    refetch: refetchClaims
  } = useQuery({
    queryKey: ["claims", user?.email],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/claims/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  const openClaimModal = (policy) => {
    setSelectedPolicy(policy);
    setShowClaimModal(true);
  };

  const handleClaimSubmit = async (data) => {
    const file = data.document[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`,
        formData
      );
      const documentUrl = imgRes.data.data.url;

      const claimData = {
        email: user.email,
        policyId: selectedPolicy._id,
        policyName: selectedPolicy.policyName,
        reason: data.reason,
        document: documentUrl,
        status: "Pending",
        claimedAt: new Date()
      };

      await axios.post("http://localhost:5000/claims", claimData);
      Swal.fire("Success", "Claim submitted successfully", "success");
      reset();
      setShowClaimModal(false);
      refetchClaims();
      refetchApplications();
    } catch (err) {
      Swal.fire("Error", "Failed to submit claim", "error");
      toast(err);
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Claim Request Page</h2>
      <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Policy</th>
            <th>Coverage</th>
            <th>Duration</th>
            <th>Premium</th>
            <th>Claim Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {approvedPolicies.map((app) => {
            const existingClaim = claims?.find(
              (claim) => claim.policyId?.toString() === app._id?.toString()
            );

            return (
              <tr key={app._id}>
                <td>{app.policyName}</td>
                <td>{app.coverage}</td>
                <td>{app.duration}</td>
                <td>{app.premium} BDT</td>
                <td>
                  {existingClaim ? (
                    <>
                      {existingClaim.status === "Pending" && (
                        <span className="badge badge-warning">Pending</span>
                      )}
                      {existingClaim.status === "Approved" && (
                        <span className="badge badge-success">Approved</span>
                      )}
                      {existingClaim.status === "Rejected" && (
                        <span className="badge badge-error">Rejected</span>
                      )}
                    </>
                  ) : (
                    <span className="badge text-xs badge-neutral p-3">Not Claimed</span>
                  )}
                </td>
                <td>
                  {!existingClaim && (
                    <button
                      className="btn btn-sm bg-gradient-to-b from-sky-400 to-blue-600 text-white"
                      onClick={() => openClaimModal(app)}
                    >
                      Claim
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
         </div>
      {/* Claim Modal */}
      {showClaimModal && (
        <dialog id="claim-modal" open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">Submit Claim</h3>
            <form onSubmit={handleSubmit(handleClaimSubmit)} className="space-y-4">
              <div>
                <label className="label font-medium">Policy Name</label>
                <input
                  type="text"
                  value={selectedPolicy?.policyName}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>
              <div>
                <label className="label font-medium">Reason</label>
                <textarea
                  {...register("reason", { required: "Reason is required" })}
                  className="textarea textarea-bordered w-full"
                  rows="3"
                  placeholder="Enter reason for claim"
                ></textarea>
                {errors.reason && (
                  <p className="text-red-500 text-sm">{errors.reason.message}</p>
                )}
              </div>
              <div>
                <label className="label font-medium">Upload Document (PDF/Image)</label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  {...register("document", { required: "Document is required" })}
                  className="file-input file-input-bordered w-full"
                />
                {errors.document && (
                  <p className="text-red-500 text-sm">{errors.document.message}</p>
                )}
              </div>
              <div className="modal-action">
                <button
                  type="submit"
                  className="btn bg-gradient-to-b from-sky-400 to-blue-600 text-white"
                >
                  Submit
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={() => setShowClaimModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ClaimRequestPage;
