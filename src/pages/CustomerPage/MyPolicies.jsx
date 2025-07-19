import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import { FaStar } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  heading: { fontSize: 18, marginBottom: 10 },
  text: { fontSize: 12 },
});

const PolicyPDF = ({ policy }) => (
  <Document>
    <Page style={styles.page}>
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
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [adminFeedback, setAdminFeedback] = useState("");

  const { data: applications = [], isLoading, refetch: refetchApplications } =
    useQuery({
      queryKey: ["myApplications", user?.email],
      queryFn: async () => {
        const res = await axios.get(
          `https://life-insurance-management-server.vercel.app/applications/user/${user.email}`
        );
        return res.data;
      },
      enabled: !!user?.email,
    });

  const handleReviewSubmit = async () => {
    if (!rating || !feedback) {
      return Swal.fire("Error", "Please provide rating and feedback", "error");
    }

    const reviewData = {
      email: user.email,
      name: user.displayName,
      photo: user.photoURL,
      policyName: selectedPolicy.policyName,
      rating,
      feedback,
      createdAt: new Date(),
    };

    try {
      await axios.post("https://life-insurance-management-server.vercel.app/reviews", reviewData);
      Swal.fire("Review submitted");
      setShowReviewModal(false);
      setFeedback("");
      setRating(0);
      refetchApplications();
    } catch (err) {
      toast(err.message);
    }
  };

  const openDetailsModal = (app) => {
    setSelectedPolicy(app);
    setShowDetailsModal(true);
  };

  const openReviewModal = (app) => {
    setSelectedPolicy(app);
    setShowReviewModal(true);
  };

  const openFeedbackModal = async (app) => {
    setSelectedPolicy(app);
    try {
      const res = await axios.get(
        `https://life-insurance-management-server.vercel.app/applications/${app._id}`
      );
      setAdminFeedback(res.data?.adminFeedback || "No feedback available");
      setShowFeedbackModal(true);
    } catch (err) {
      toast.error("Failed to fetch feedback", err);
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Policies</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Policy</th>
              <th>Coverage</th>
              <th>Duration</th>
              <th>Premium</th>
              <th>Status</th>
              <th>Actions</th>
              <th>PDF</th>
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
                <td className="space-x-1">
                  <button
                    className="btn bg-gradient-to-b from-sky-400 to-blue-600 text-white btn-sm"
                    onClick={() => openDetailsModal(app)}
                  >
                    View
                  </button>
                  {app.status === "Approved" ? (
                    <button
                      className="btn btn-sm bg-gradient-to-b from-sky-400 to-blue-600 text-white  btn-outline"
                      onClick={() => openReviewModal(app)}
                    >
                      Review
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm bg-gradient-to-b from-sky-400 to-blue-600 text-white btn-outline"
                      onClick={() => openFeedbackModal(app)}
                    >
                      Feedback
                    </button>
                  )}
                </td>
                <td>
                  {app.status === "Approved" ? (
                    <PDFDownloadLink
                      document={
                        <PolicyPDF
                          policy={{
                            ...app,
                            name: user.displayName,
                            email: user.email,
                          }}
                        />
                      }
                      fileName={`Policy_${app.policyName}.pdf`}
                      className="btn bg-gradient-to-b from-sky-400 to-blue-600 text-white btn-sm"
                    >
                      {({ loading }) =>
                        loading ? "Generating..." : "Download"
                      }
                    </PDFDownloadLink>
                  ) : (
                    <button className="btn btn-sm btn-disabled">Download</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedPolicy && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Policy Details</h3>
            <p className="mb-2">Policy: {selectedPolicy.policyName}</p>
            <p className="mb-2">Coverage: {selectedPolicy.coverage}</p>
            <p className="mb-2">Duration: {selectedPolicy.duration}</p>
            <p className="mb-2">Premium: {selectedPolicy.premium} BDT</p>
            <form method="dialog" className="modal-action">
              <button
                className="btn"
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </button>
            </form>
          </div>
        </dialog>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Submit Review</h3>
            <div className="flex gap-1 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
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
            />
            <div className="modal-action">
              <form method="dialog" className="flex gap-2">
                <button
                  className="btn"
                  onClick={() => setShowReviewModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleReviewSubmit}
                  className="btn bg-blue-600 text-white"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Admin Feedback</h3>
            <p>{adminFeedback}</p>
            <form method="dialog" className="modal-action">
              <button
                className="btn"
                onClick={() => setShowFeedbackModal(false)}
              >
                Close
              </button>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyPolicies;
