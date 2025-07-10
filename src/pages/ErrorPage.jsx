import { Link } from "react-router";


const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="text-center animate-fadeIn">
        <h1 className="text-7xl font-bold text-blue-700 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found.</p>

        <Link
          to="/"
          className="inline-block bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition duration-200"
        >
         Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
