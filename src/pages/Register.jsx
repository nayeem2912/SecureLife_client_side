import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import { useState } from "react";
import Logo from "../components/Logo";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [registerError, setRegisterError] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);

  const onSubmit = (data) => {
    const password = data.password;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);

    if (!hasUpper || !hasLower || password.length < 6) {
      setRegisterError(
        "Password must be at least 6 characters with one uppercase and one lowercase letter"
      );
      return;
    }

    setRegisterError("");
    console.log("Registration Data:", data);
    // Registration logic (Firebase/Auth or backend call)
  };

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
    // Google Auth logic
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen my-10 flex items-center justify-center">
      <div className="w-11/12 max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200 animate-fadeIn">
        <div className="text-center mb-6 space-y-3">
         <div className="flex justify-center items-center">
            <Logo></Logo>
         </div>
          <h2 className="text-2xl font-bold bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent">Create an Account</h2>
          <p className="text-gray-500 text-sm">Join SecureLife and manage your policies easily</p>
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-blue-50 transition duration-200 mb-6"
        >
          <FcGoogle className="text-2xl mr-2" />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              {...register("name", { required: "Name is required" })}
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Minimum 6 characters"
              {...register("password", {
                required: "Password is required",
              })}
              className={`w-full border rounded-md px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 ${
                registerError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-emerald-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
            {registerError && (
              <p className="text-red-500 text-sm mt-1">{registerError}</p>
            )}
          </div>

          {/* Photo Upload */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: "Photo is required" })}
              onChange={handlePhotoChange}
              className="w-full border text-gray-700 border-gray-300 rounded-md px-4 py-1"
            />
            {errors.photo && (
              <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
            )}
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-full mt-2 border"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full text-white py-2 rounded-md bg-gradient-to-b from-sky-400 to-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>

        {/* Link to Login */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
