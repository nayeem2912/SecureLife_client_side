
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import dayjs from "dayjs";
import { Helmet } from "react-helmet-async";


const Blog = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/blogs");
      return res.data;
    },
  });

  const updateVisitMutation = useMutation({
    mutationFn: async (id) => {
      return await axios.patch(`http://localhost:5000/blogs/${id}/visit`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const handleReadMore = (blog) => {
    updateVisitMutation.mutate(blog._id);
   navigate(`/blogs/${blog._id}`)
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Helmet>
                      <title>SecureLife | Blog</title>
                  </Helmet>
      <h2 className="text-3xl font-bold mb-6">Latest Blog Articles</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white shadow-md rounded-xl overflow-hidden">
            <img src={blog.image} alt={blog.title} className="w-full h-52 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-gray-600 mt-2">
                {blog.content.split(" ").slice(0, 25).join(" ")}...
              </p>
              <div className="flex items-center gap-3 mt-4 text-sm text-gray-500">
                {blog.authorImage && (
                  <img src={blog.authorImage} alt="author" className="w-8 h-8 rounded-full" />
                )}
                <span className="font-medium">{blog.authorName}</span>
                <span className="ml-auto">{dayjs(blog.publishDate).format("MMM D, YYYY")}</span>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-gray-400">Visits: {blog.visits || 0}</span>
                <button
                  onClick={() => handleReadMore(blog)}
                  className="text-blue-600 underline text-sm"
                >
                  Read more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
