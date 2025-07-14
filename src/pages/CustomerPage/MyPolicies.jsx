// MyPolicies.jsx
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
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

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
            : "bg-sky-500"
        }`}>
          {app.status}
        </span>
      </td>
      <td className="space-x-2">
        <button
          className={`btn btn-sm btn-outline ${app.status !== "Approved" ? "btn-disabled opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => {
            if (app.status === "Approved") {
              setSelectedPolicy(app);
              setShowReviewModal(true);
            }
          }}
          disabled={app.status !== "Approved"}
        >
          Give Review
        </button>

        <PDFDownloadLink
          document={<PolicyPDF policy={app} />}
          fileName={`Policy_${app.policyName}.pdf`}
        >
          {({ loading }) => (
            <button
              className={`btn btn-sm bg-blue-600 text-white ${app.status !== "Approved" ? "btn-disabled opacity-50 cursor-not-allowed" : ""}`}
              disabled={app.status !== "Approved"}
            >
              {loading ? "Loading..." : "Download Policy"}
            </button>
          )}
        </PDFDownloadLink>
      </td>
    </tr>
  ))}
</tbody>

      </table>

      {/* Review Modal */}
      {showReviewModal && (
        <dialog id="review-modal" open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Submit Review</h3>
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
              placeholder="Write your feedback here"
            ></textarea>
            <div className="modal-action">
              <form method="dialog" className="flex gap-2">
                <button className="btn" onClick={() => setShowReviewModal(false)}>Cancel</button>
                <button type="button" onClick={handleReviewSubmit} className="btn bg-blue-600 text-white">Submit</button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyPolicies;
