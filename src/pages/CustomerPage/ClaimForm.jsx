import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const ClaimForm = ({ policy }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data) => {
    const file = data.document[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`,
        formData
      );
      const docUrl = imgRes.data.data.url;

      const claimData = {
        userEmail: user.email,
        policyId: policy._id,
        policyName: policy.policyName,
        reason: data.reason,
        document: docUrl,
        status: "Pending",
        submittedAt: new Date()
      };

      const res = await axios.post("http://localhost:5000/claims", claimData);
      if (res.data.insertedId) {
        toast.success("Claim submitted successfully");
        reset();
      }
    } catch (err) {
      toast.error("Submission failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 shadow rounded max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-semibold text-center mb-4">Submit Policy Claim</h2>

      <input
        type="text"
        readOnly
        defaultValue={policy.policyName}
        className="input input-bordered w-full bg-gray-100 text-gray-800"
      />

      <textarea
        placeholder="Reason for claim"
        {...register("reason", { required: "Reason is required" })}
        className="textarea textarea-bordered w-full"
      />
      {errors.reason && <p className="text-red-500 text-sm">{errors.reason.message}</p>}

      <input
        type="file"
        accept=".pdf,image/*"
        {...register("document", { required: "Document is required" })}
        className="file-input file-input-bordered w-full"
      />
      {errors.document && <p className="text-red-500 text-sm">{errors.document.message}</p>}

      <button type="submit" className="btn btn-primary w-full" disabled={uploading}>
        {uploading ? "Uploading..." : "Submit Claim"}
      </button>
    </form>
  );
};

export default ClaimForm;
