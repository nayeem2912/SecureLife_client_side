import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ApplicationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const applicationData = {
      ...data,
      status: "Pending",
    };

    try {
      const res = await axios.post("http://localhost:5000/applications", applicationData);
      if (res.data.insertedId) {
        Swal.fire({
  title: "Application submitted successfully!",
  icon: "success",
  draggable: true
});
        reset();
      }
    } catch (error) {
      toast.error("Submission failed. Please try again.", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10 mb-10">
      <h2 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent">Insurance Application Form</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Personal Info */}
        <div>
          <h3 className="text-lg text-gray-800 font-medium mb-2">Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: "Name is required" })}
                className="input  bg-gray-100  text-gray-800 input-bordered w-full"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="input  bg-gray-100  text-gray-800 input-bordered w-full"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Address"
                {...register("address", { required: "Address is required" })}
                className="input  bg-gray-100  text-gray-800 input-bordered w-full"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="NID Number"
                {...register("nid", { required: "NID Number is required" })}
                className="input  bg-gray-100  text-gray-800 input-bordered w-full"
              />
              {errors.nid && <p className="text-red-500 text-sm mt-1">{errors.nid.message}</p>}
            </div>
          </div>
        </div>

        {/* Nominee Info */}
        <div>
          <h3 className="text-lg  text-gray-800 font-medium mb-2">Nominee Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Nominee Name"
                {...register("nomineeName", { required: "Nominee name is required" })}
                className="input  bg-gray-100  text-gray-800 input-bordered w-full"
              />
              {errors.nomineeName && <p className="text-red-500 text-sm mt-1">{errors.nomineeName.message}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Relationship"
                {...register("nomineeRelation", { required: "Relationship is required" })}
                className="input  bg-gray-100  text-gray-800 input-bordered w-full"
              />
              {errors.nomineeRelation && <p className="text-red-500 text-sm mt-1">{errors.nomineeRelation.message}</p>}
            </div>
          </div>
        </div>

        {/* Health Disclosure */}
        <div>
          <h3 className="text-lg  text-gray-800 font-medium mb-2">Health Disclosure</h3>
          <div className="grid grid-cols-1 text-gray-800 md:grid-cols-2 gap-2">
            <label className="flex   items-center space-x-2">
              <input type="checkbox" {...register("hasChronicDisease")} className="checkbox text-gray-800 border-gray-500 border-1" />
              <span>Chronic Illness</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" {...register("takesMedication")} className="checkbox 0 text-gray-800 border-gray-500 border-1" />
              <span>Currently on Medication</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" {...register("hasSurgeryHistory")} className="checkbox text-gray-800 border-gray-500 border-1" />
              <span>Past Surgery</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" {...register("smokes")} className="checkbox text-gray-800 border-gray-500 border-1" />
              <span>Smoker</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn bg-gradient-to-b from-sky-400 to-blue-600 text-white w-full mt-6">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplicationForm;
