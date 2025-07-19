import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

// TanStack fetch function
const fetchLatestBlogs = async () => {
  const res = await axios.get("http://localhost:5000/blog");
  return res.data;
};

const LatestBlogs = () => {
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["latestBlogs"],
    queryFn: fetchLatestBlogs,
  });

  if (isLoading)
    return <div className="text-center py-10">Loading blogs...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent text-center mb-10">
        Latest Blog
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-all duration-300 border"
          >
            <h3 className="text-xl text-gray-600 font-semibold mb-2">{blog.title}</h3>
            <p className="text-gray-600 mb-4">
              {blog.summary?.slice(0, 100)}...
            </p>
            <Link
              to={`/blogs/${blog._id}`}
              className=" bg-gradient-to-b from-sky-400 to-blue-600 bg-clip-text text-transparent hover:underline font-medium"
            >
              Read more →
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/blog"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          All Blog 
        </Link>
      </div>
    </div>
  );
};

export default LatestBlogs;
