
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const ManageBlogs = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");
  const queryClient = useQueryClient();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["agentBlogs", user?.email],
    queryFn: async () => {
      const res = await axios.get(`https://life-insurance-management-server.vercel.app/blogs/agent/${user.email}`);
      return res.data;
    }
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://life-insurance-management-server.vercel.app/blogs/${id}`);
      Swal.fire( "Blog post deleted");
      queryClient.invalidateQueries(["agentBlogs", user.email]);
    } catch (err) {
      toast(err);
      Swal.fire( "Failed to delete blog");
    }
  };

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`,
        formData
      );
      setImage(res.data.data.url);
    } catch (err) {
      toast("Image upload failed", err);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content || !image) return Swal.fire( "All fields are required");

    const blogData = {
      title,
      content,
      image,
      summary,
      authorName: user.displayName,
      authorImage: user.photoURL,
      email: user.email,
      visits: 0,
      publishDate: new Date()
    };

    try {
      if (editBlog) {
        await axios.patch(`https://life-insurance-management-server.vercel.app/blogs/${editBlog._id}`, blogData);
        Swal.fire("Updated", "Blog updated successfully", "success");
      } else {
        await axios.post("https://life-insurance-management-server.vercel.app/blogs", blogData);
        Swal.fire("Blog post created");
      }
      setTitle("");
      setContent("");
      setSummary("");
      setImage("");
      setEditBlog(null);
      setShowModal(false);
      queryClient.invalidateQueries(["agentBlogs", user.email]);
    } catch (err) {
      
      Swal.fire( "Failed to submit blog", err);
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Blogs</h2>
        <button className="btn btn-sm bg-gradient-to-b from-sky-400 to-blue-600
 text-white" onClick={() => setShowModal(true)}>Create New Blog</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog.title}</td>
                <td>{blog.authorName}</td>
                <td>{new Date(blog.
publishDate).toLocaleDateString()}</td>
                <td className="space-x-2">
                  <button className="btn bg-gradient-to-b from-sky-400 to-blue-600
 text-white btn-md btn-outline" onClick={() => {
                    setEditBlog(blog);
                    setTitle(blog.title);
                    setContent(blog.content);
                    setSummary(blog.summary)
                    setImage(blog.image);
                    setShowModal(true);
                  }}>Edit</button>
                  
                </td>
                <td>
                  <button className="btn btn-md bg-red-600 text-white" onClick={() => handleDelete(blog._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <dialog open className="modal">
          <div className="modal-box w-full max-w-2xl">
            <h3 className="font-bold text-lg mb-4">{editBlog ? "Edit Blog" : "Create Blog Post"}</h3>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full mb-4"
            />
            <textarea
              placeholder="Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="textarea textarea-bordered w-full h-40 mb-4"
            ></textarea>
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="textarea textarea-bordered w-full h-40 mb-4"
            ></textarea>
            
            <input
              type="file"
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full mb-4"
            />
            {image && <img src={image} alt="Preview" className="w-32 h-20 object-cover mb-2 rounded" />}
            <p className="mb-4 text-sm text-gray-500">Author: <strong>{user.displayName}</strong></p>
            <div className="modal-action">
              <button className="btn" onClick={() => {
                setShowModal(false);
                setEditBlog(null);
                setTitle("");
                setContent("");
                setSummary("")
                setImage("");
              }}>Cancel</button>
              <button className="btn btn-md bg-gradient-to-b from-sky-400 to-blue-600
 text-white" onClick={handleSubmit}>{editBlog ? "Update" : "Publish"}</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageBlogs;
