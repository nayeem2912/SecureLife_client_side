import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

const ManageUsers = () => {
  const [filter, setFilter] = useState("");

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["allUsers", filter],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/users");
      return filter ? res.data.filter(user => user.role === filter) : res.data;
    },
  });

  const handlePromote = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/users/promote/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Promoted!");
        refetch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDemote = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/users/demote/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Demoted!");
        refetch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/* Optional Filter */}
      <div className="mb-4">
        <select
          className="select select-bordered"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Registered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              <td>
                {u.role === "user" && (
                  <button
                    className="btn btn-sm bg-gradient-to-b from-sky-400 to-blue-600
 transition text-white"
                    onClick={() => handlePromote(u._id)}
                  >
                    Promote to Agent
                  </button>
                )}
                {u.role === "agent" && (
                  <button
                    className="btn btn-sm bg-gradient-to-b from-sky-400 to-blue-600
 transition text-white"
                    onClick={() => handleDemote(u._id)}
                  >
                    Demote to User
                  </button>
                )}
                {u.role === "admin" && <span className="text-gray-500">Admin</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
