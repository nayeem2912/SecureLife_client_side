// ManagePolicies.jsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const ManagePolicies = () => {
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();

  const { data: policies = [], refetch, isLoading } = useQuery({
    queryKey: ["allPolicies"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/policy");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the policy permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axios.delete(`http://localhost:5000/policies/${id}`);
      refetch();
      Swal.fire( "Policy has been deleted.");
    }
  };

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const photoRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`,
        formData
      );

      const imageUrl = photoRes.data.data.url;

      const policyData = {
        ...data,
        image: imageUrl,
        minAge: parseInt(data.minAge),
        maxAge: parseInt(data.maxAge),
        coverage: data.coverage,
        termLength: data.termLength,
        basePremium: parseFloat(data.basePremium),
      };

      if (editingPolicy) {
        await axios.patch(`http://localhost:5000/policies/${editingPolicy._id}`, policyData);
        Swal.fire("Policy updated successfully");
      } else {
        await axios.post("http://localhost:5000/policies", policyData);
        Swal.fire("Policy added successfully");
      }

      reset();
      setEditingPolicy(null);
      setShowModal(false);
      refetch();
    } catch (err) {
      Swal.fire( "Something went wrong", err);
    }
  };

  const handleEdit = (policy) => {
    setEditingPolicy(policy);
    setShowModal(true);
    setValue("title", policy.title);
    setValue("category", policy.category);
    setValue("shortDescription", policy.shortDescription);
    setValue("minAge", policy.minAge);
    setValue("maxAge", policy.maxAge);
    setValue("coverage", policy.coverage);
    setValue("termLength", policy.termLength);
    setValue("basePremium", policy.basePremium);
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Policies</h2>
      <button className="btn mb-4 bg-gradient-to-b from-sky-400 to-blue-600
 text-white" onClick={() => { setEditingPolicy(null); reset(); setShowModal(true); }}>Add New Policy</button>
        <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Age Range</th>
            <th>Coverage</th>
            <th>Base Rate</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {policies.map((p) => (
            <tr key={p._id}>
              <td>{p.title}</td>
              <td>{p.category}</td>
              <td>{p.minAge} - {p.maxAge}</td>
              <td>{p.coverage}</td>
              <td>{p.basePremium}</td>
              <td>
                <button className="btn btn-sm bg-gradient-to-b from-sky-400 to-blue-600
 text-white btn-outline" onClick={() => handleEdit(p)}>Edit</button>
                
              </td>
              <td>
                <button className="btn btn-sm bg-red-500 text-white ml-2" onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
      {/* Modal */}
      {showModal && (
        <dialog open className="modal">
          <div className="modal-box max-w-xl">
            <h3 className="font-bold text-lg mb-2">{editingPolicy ? "Edit Policy" : "Add Policy"}</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input {...register("title", { required: true })} className="input input-bordered w-full" placeholder="Policy Title" />
              <input {...register("category", { required: true })} className="input input-bordered w-full" placeholder="Category" />
              <textarea {...register("shortDescription", { required: true })} className="textarea textarea-bordered w-full" placeholder="Description"></textarea>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" {...register("minAge", { required: true })} className="input input-bordered w-full" placeholder="Minimum Age" />
                <input type="number" {...register("maxAge", { required: true })} className="input input-bordered w-full" placeholder="Maximum Age" />
              </div>
              <input {...register("coverage", { required: true })} className="input input-bordered w-full" placeholder="Coverage Range (e.g. 500000 - 2000000)" />
              <input {...register("termLength", { required: true })} className="input input-bordered w-full" placeholder="Duration Options (e.g. 5,10,15 years)" />
              <input type="number" step="0.01" {...register("basePremium", { required: true })} className="input input-bordered w-full" placeholder="Base Premium Rate" />
              <input type="file" {...register("image", { required: !editingPolicy })} className="file-input file-input-bordered w-full" />
              <div className="modal-action">
                <button type="submit" className="btn bg-gradient-to-b from-sky-400 to-blue-600
  text-white">{editingPolicy ? "Update" : "Add"}</button>
                <button type="button" onClick={() => setShowModal(false)} className="btn">Cancel</button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManagePolicies;
