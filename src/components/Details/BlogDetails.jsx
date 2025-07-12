import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBlogById = async (id) => {
  const res = await axios.get(`http://localhost:5000/blogs/${id}`);
  return res.data;
};

const BlogDetails = () => {
  const { id } = useParams();

  const { data: blog, isLoading, isError } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id),
    enabled: !!id,
  });

  if (isLoading) return <div className="text-center py-10">Loading blog...</div>;
  if (isError) return <div className="text-center text-red-500 py-10">Error loading blog.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">{blog.title}</h1>

      <div className="flex items-center gap-3 mb-4">
        <img src={blog.authorImage} alt={blog.authorName} className="w-10 h-10 rounded-full" />
        <div>
          <p className="text-sm font-medium text-gray-700">{blog.authorName}</p>
          <p className="text-xs text-gray-500">{new Date(blog.publishDate).toLocaleDateString()}</p>
        </div>
      </div>

      <img
        src={blog.image}
        alt={blog.title}
        className="w-full max-h-[400px] object-cover rounded-lg shadow mb-6"
      />

      <p className="text-gray-700 text-lg leading-relaxed">{blog.content}</p>

      
    </div>
  );
};

export default BlogDetails;
