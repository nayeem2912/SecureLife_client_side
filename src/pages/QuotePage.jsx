import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";


const fetchPolicyDetails = async (id) => {
  const res = await axios.get(`https://life-insurance-management-server.vercel.app/policies/${id}`);
  return res.data;
};

const QuotePage = () => {
  const [quote, setQuote] = useState(null);
  const { id } = useParams();
  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { data: policy, isLoading, error } = useQuery({
    queryKey: ["policyDetails", id],
    queryFn: () => fetchPolicyDetails(id),
  });

  const calculateQuote = ({ age, gender, coverage, duration, smoker }) => {
    const cov = parseInt(coverage) || 0;
    const dur = parseInt(duration) || 1;
    const ageNum = parseInt(age) || 0;

    let baseRate = 0.008;

    if (smoker === "yes") baseRate += 0.004;
    if (ageNum > 50) baseRate += 0.002;
    if (gender === "male") baseRate += 0.001;

    const annualPremium = Math.round(cov * baseRate * dur);
    const monthlyPremium = Math.round(annualPremium / 12);

    setQuote({ monthlyPremium, annualPremium });
  };

  const onSubmit = (data) => {
    calculateQuote(data);
  };

  const handleApplyForPolicy = async () => {
    const data = watch();
    if (!quote || !user?.email) return;

    const payload = {
      ...data,
      policyId: policy._id,
      policyName: policy.title,
      coverage: data.coverage + " BDT",
      duration: data.duration + " Years",
      premium: quote.monthlyPremium,
      email: user.email,
      createdAt: new Date(),
    };

    try {
      const res = await axios.post("https://life-insurance-management-server.vercel.app/quotes", payload);
      if (res.data.insertedId) {
        toast("Quote saved successfully!");
      }
    } catch (err) {
      toast("Failed to save quote:", err);
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Error loading policy.</p>;

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent">Get a Quote</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Policy Name</label>
          <input
            type="text"
            {...register("policyName", { required: true })}
            defaultValue={policy.title}
            placeholder="Enter policy name"
            className="input bg-gray-100 text-gray-800 input-bordered w-full"
          />
          {errors.policyName && (
            <p className="text-red-500 text-sm mt-1">Policy name is required</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Age</label>
          <input
            type="number"
            {...register("age", { required: "Age is required", min: 18 })}
            className="input bg-gray-100 text-gray-800 input-bordered w-full"
            placeholder="e.g. 30"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Gender</label>
          <select {...register("gender", { required: true })} className="select bg-gray-100 text-gray-800 select-bordered w-full">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Coverage Amount (BDT)</label>
          <input
            type="number"
            {...register("coverage", { required: true })}
            className="input bg-gray-100 text-gray-800 input-bordered w-full"
            placeholder="e.g. 2000000"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Duration (Years)</label>
          <input
            type="number"
            {...register("duration", { required: true, min: 1 })}
            className="input bg-gray-100 text-gray-800 input-bordered w-full"
            placeholder="e.g. 10"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Do you smoke?</label>
          <select {...register("smoker", { required: true })} className="select bg-gray-100 text-gray-800 select-bordered w-full">
            <option value="">Select</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <button type="submit" className="btn bg-gradient-to-b from-sky-400 to-blue-600 text-white w-full mt-4">Calculate Quote</button>
      </form>

      {quote && (
        <div className="mt-8 p-4 bg-sky-50 border border-sky-200 rounded">
          <h3 className="text-lg text-gray-700 font-semibold mb-2">Estimated Premium:</h3>
          <p className="text-gray-800">Monthly: <strong>{quote.monthlyPremium} BDT</strong></p>
          <p className="text-gray-800">Annually: <strong>{quote.annualPremium} BDT</strong></p>
          <Link to={`/application/${policy._id}`}>
          <button onClick={handleApplyForPolicy} className="btn text-white bg-gradient-to-b from-sky-400 to-blue-600 mt-4 w-full">Apply for Policy</button></Link>
        </div>
      )}
    </div>
  );
};

export default QuotePage;
