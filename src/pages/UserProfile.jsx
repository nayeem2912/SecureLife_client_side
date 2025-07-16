import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UserProfileCard = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [photo, setPhoto] = useState(user.photoURL);

  const updateProfile = useMutation({
    mutationFn: async () => {
      await axios.patch(`http://localhost:5000/users/${user.email}`, {
        name,
        photo,
      });
    },
    onSuccess: () => {
      Swal.fire("Success", "Profile updated", "success");
      setEditing(false);
    },
    onError: () => {
      Swal.fire("Error", "Update failed", "error");
    },
  });

  return (
    <div className="border p-4 rounded shadow mb-4">
      <div className="flex items-center gap-4">
        <img
          src={photo || "/default-avatar.png"}
          alt={name}
          className="w-16 h-16 rounded-full border"
        />
        <div className="flex-1">
          {editing ? (
            <>
              <input
                className="input input-bordered mb-2 w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="input input-bordered w-full"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold">{name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </>
          )}

          <div className="mt-2">
            <span className={`badge ${user.role === 'Admin' ? 'badge-error' : user.role === 'Agent' ? 'badge-info' : 'badge-success'}`}>{user.role}</span>
            <p className="text-xs mt-1 text-gray-500">Last Login: {user?.lastSignInTime || 'N/A'}</p>
          </div>
        </div>
        <div>
          {editing ? (
            <button className="btn btn-sm btn-success" onClick={() => updateProfile.mutate()}>Save</button>
          ) : (
            <button className="btn btn-sm" onClick={() => setEditing(true)}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

const UserProfiles = () => {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/users");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">User Profiles</h2>
      <div className="grid grid-cols-2 gap-4">
        {users.map((user) => (
        <UserProfileCard key={user._id} user={user} />
      ))}

      </div>
     
    </div>
  );
};

export default UserProfiles;
