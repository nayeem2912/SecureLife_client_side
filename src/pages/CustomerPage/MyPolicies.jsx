import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { PDFDownloadLink, Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import { FaStar } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  heading: { fontSize: 18, marginBottom: 10 },
  text: { fontSize: 12 }
});

const PolicyPDF = ({ policy }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>Policy Summary</Text>
      <Text style={styles.text}>Name: {policy.name}</Text>
      <Text style={styles.text}>Email: {policy.email}</Text>
      <Text style={styles.text}>Policy: {policy.policyName}</Text>
      <Text style={styles.text}>Coverage: {policy.coverage}</Text>
      <Text style={styles.text}>Duration: {policy.duration}</Text>
      <Text style={styles.text}>Premium: {policy.premium} BDT</Text>
      <Text style={styles.text}>Status: {policy.status}</Text>
    </Page>
  </Document>
);

const MyPolicies = () => {
  const { user } = useAuth();
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [claimReason, setClaimReason] = useState("");
  const [claimFile, setClaimFile] = useState(null);

  const {
    data: applications = [],
    isLoading,
    refetch: refetchApplications
  } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/applications/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  const fetchRejectionReason = async (applicationId) => {
    try {
      const res = await axios.get(`http://localhost:5000/applications/rejection/${applicationId}`);
      setRejectionReason(res.data.reason || "No reason provided.");
    } catch (err) {
      console.error("Failed to fetch rejection reason", err);
      setRejectionReason("No reason provided.");
    }
  };

  const handleReviewSubmit = async () => {
    if (!rating || !feedback) {
      return Swal.fire("Error", "Please provide rating and feedback", "error");
    }

    const reviewData = {
      email: user.email,
      name: user.displayName,
      policyName: selectedPolicy.policyName,
      rating,
      feedback,
      createdAt: new Date()
    };

    try {
      await axios.post("http://localhost:5000/reviews", reviewData);
      Swal.fire("Success", "Review submitted", "success");
      setShowReviewModal(false);
      setFeedback("");
      setRating(0);
      refetchApplications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClaimSubmit = async () => {
    if (!claimReason || !claimFile) {
      return Swal.fire("Error", "Please provide a reason and upload a file.", "error");
    }

    const formData = new FormData();
    formData.append("applicationId", selectedPolicy._id);
    formData.append("email", user.email);
    formData.append("reason", claimReason);
    formData.append("file", claimFile);

    try {
      await axios.post("http://localhost:5000/claims", formData);
      Swal.fire("Success", "Claim submitted", "success");
      setShowClaimModal(false);
      setClaimFile(null);
      setClaimReason("");
      refetchApplications();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to submit claim", "error");
    }
  };

  const openReviewModal = async (app) => {
    setSelectedPolicy(app);
    if (app.status === "Rejected") {
      await fetchRejectionReason(app._id);
    }
    setShowReviewModal(true);
  };

  const openClaimForm = (app) => {
    setSelectedPolicy(app);
    setShowClaimModal(true);
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Policies</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Policy</th>
            <th>Coverage</th>
            <th>Duration</th>
            <th>Premium</th>
            <th>Status</th>
            <th>Claim</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.policyName}</td>
              <td>{app.coverage}</td>
              <td>{app.duration}</td>
              <td>{app.premium} BDT</td>
              <td>
                <span className={`px-2 py-1 rounded text-white text-xs ${
                  app.status === "Approved"
                    ? "bg-green-500"
                    : app.status === "Rejected"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}>
                  {app.status}
                </span>
              </td>
              <td>
                {app.claimStatus === "Approved" && <span className="badge badge-success">Approved</span>}
                {app.claimStatus === "Pending" && <span className="badge badge-warning">Pending</span>}
                {!app.claimStatus && app.status === "Approved" && (
                  <button className="btn btn-sm" onClick={() => openClaimForm(app)}>Claim</button>
                )}
              </td>
              <td className="space-x-2">
                {app.status === "Approved" ? (
                  <>
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => openReviewModal(app)}
                    >
                      Give Review
                    </button>
                    <PDFDownloadLink
                      document={<PolicyPDF policy={app} />}
                      fileName={`Policy_${app.policyName}.pdf`}
                    >
                      {({ loading }) => (
                        <button className="btn btn-sm bg-blue-600 text-white">
                          {loading ? "Loading..." : "Download Policy"}
                        </button>
                      )}
                    </PDFDownloadLink>
                  </>
                ) : app.status === "Rejected" ? (
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => openReviewModal(app)}
                  >
                    View Feedback
                  </button>
                ) : (
                  <>
                    <button className="btn btn-sm btn-outline" disabled>
                      Give Review
                    </button>
                    <button className="btn btn-sm bg-blue-600 text-white" disabled>
                      Download Policy
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Review/Feedback Modal */}
      {showReviewModal && (
        <dialog id="review-modal" open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {selectedPolicy?.status === "Rejected" ? "Rejection Reason" : "Submit Review"}
            </h3>

            {selectedPolicy?.status === "Rejected" ? (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-2">
                <strong>Reason:</strong><br /> {rejectionReason}
              </div>
            ) : (
              <>
                <div className="flex gap-1 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="textarea textarea-bordered w-full"
                  rows="3"
                  placeholder="Write your review here"
                ></textarea>
              </>
            )}

            <div className="modal-action">
              <form method="dialog" className="flex gap-2">
                <button className="btn" onClick={() => setShowReviewModal(false)}>Close</button>
                {selectedPolicy?.status === "Approved" && (
                  <button
                    type="button"
                    onClick={handleReviewSubmit}
                    className="btn bg-blue-600 text-white"
                  >
                    Submit
                  </button>
                )}
              </form>
            </div>
          </div>
        </dialog>
      )}

      {/* Claim Modal */}
      {showClaimModal && (
        <dialog id="claim-modal" open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Submit Claim</h3>
            <input
              type="text"
              placeholder="Reason for Claim"
              value={claimReason}
              onChange={(e) => setClaimReason(e.target.value)}
              className="input input-bordered w-full mb-3"
            />
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setClaimFile(e.target.files[0])}
              className="file-input file-input-bordered w-full"
            />
            <div className="modal-action">
              <form method="dialog" className="flex gap-2">
                <button className="btn" onClick={() => setShowClaimModal(false)}>Cancel</button>
                <button
                  type="button"
                  onClick={handleClaimSubmit}
                  className="btn bg-blue-600 text-white"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyPolicies;
