import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";

const fetchBlogById = async (id) => {
  const res = await axios.get(`https://life-insurance-management-server.vercel.app/blogs/${id}`);
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
   <div className="max-w-5xl mx-auto px-5 py-10 bg-white shadow-md rounded-lg animate-fadeIn my-10">
      {/* Blog Header */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>

      {/* Author Info */}
      <div className="flex items-center gap-4 mb-6">
        {blog.authorImage && (
          <img src={blog.authorImage} alt="Author" className="w-12 h-12 rounded-full border" />
        )}
        <div>
          <p className="text-gray-700 font-semibold">{blog.authorName}</p>
          <p className="text-sm text-gray-500">{dayjs(blog.publishDate).format("MMMM D, YYYY")}</p>
        </div>
      </div>

      {/* Main Image */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-80 object-cover rounded-lg shadow mb-8"
      />

      {/* Blog Content */}
      <div className="text-lg text-gray-800 leading-relaxed space-y-4">
        {blog.content.split("\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Extra Info */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
