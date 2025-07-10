import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import Logo from "../components/Logo";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    // Add your Firebase or backend login logic here
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Google Login with Firebase/Auth here
  };

  const handleForgetPassword = () => {
    // Redirect to forgot password page or open a modal
    console.log("Redirect to forgot password");
  };

  return (
    <div className="min-h-screen  flex items-center justify-center my-10">
      <div className="w-11/12 max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-blue-100 animate-fadeIn">
        
        <div className="text-center mb-6 space-y-4">
           <div className="flex justify-center items-center">
             <Logo></Logo>
           </div>
          <h2 className="text-2xl font-bold bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Login to your SecureLife account</p>
        </div>

        
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-blue-50 transition duration-200 mb-6"
        >
          <FcGoogle className="text-2xl mr-2" />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>

        
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
              className="w-full border text-gray-500 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          
          <div className="mb-2">
            <label htmlFor="password" className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters",
                },
              })}
              className={`w-full text-gray-500 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-4">
            <a
              
              onClick={handleForgetPassword}
              className="text-sm link link-hover bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent "
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white py-2 rounded-md bg-gradient-to-b from-sky-400 to-blue-600
 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent underline font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
