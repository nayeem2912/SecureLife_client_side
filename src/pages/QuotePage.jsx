import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const QuotePage = () => {
  const [quote, setQuote] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent">Get a Free Quote</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Age */}
        <div>
          <label className="block  text-gray-700 mb-1">Age</label>
          <input
            type="number"
            {...register("age", { required: "Age is required", min: 18 })}
            className="input  bg-gray-100  text-gray-800  input-bordered w-full"
            placeholder="e.g. 30"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
        </div>

        {/* Gender */}
        <div>
          <label className="block  text-gray-700 mb-1">Gender</label>
          <select {...register("gender", { required: true })} className="select  bg-gray-100  text-gray-800  select-bordered w-full">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Coverage */}
        <div>
          <label className="block  text-gray-700 mb-1">Coverage Amount (BDT)</label>
          <input
            type="number"
            {...register("coverage", { required: true })}
            className="input  bg-gray-100  text-gray-800  input-bordered w-full"
            placeholder="e.g. 2000000"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block  text-gray-700 mb-1">Duration (Years)</label>
          <input
            type="number"
            {...register("duration", { required: true, min: 1 })}
            className="input bg-gray-100  text-gray-800 input-bordered w-full"
            placeholder="e.g. 10"
          />
        </div>

        {/* Smoker */}
        <div>
          <label className="block  text-gray-700 mb-1">Do you smoke?</label>
          <select {...register("smoker", { required: true })} className="select  bg-gray-100  text-gray-800  select-bordered w-full">
            <option value="">Select</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <button type="submit" className="btn bg-gradient-to-b from-sky-400 to-blue-600 text-white w-full mt-4">Calculate Quote</button>
      </form>

      {quote && (
        <div className="mt-8 p-4 bg-sky-50 border border-sky-200 rounded">
          <h3 className="text-lg text-gray-700 font-semibold  mb-2">Estimated Premium:</h3>
          <p className="text-gray-800">Monthly: <strong>{quote.monthlyPremium} BDT</strong></p>
          <p className="text-gray-800">Annually: <strong>{quote.annualPremium} BDT</strong></p>
          <Link to='/application'>
          <button className="btn text-white bg-gradient-to-b from-sky-400 to-blue-600 mt-4">Apply for Policy</button></Link>
        </div>
      )}
    </div>
  );
};

export default QuotePage;
