import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UserProfileCard = ({ users }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(users.name);
  const [photoURL, setPhoto] = useState(users.photoURL);

  const updateProfile = useMutation({
    mutationFn: async () => {
      await axios.patch(`https://life-insurance-management-server.vercel.app/users/${users.email}`, {
        name,
        photoURL,
      });
    },
    onSuccess: () => {
      Swal.fire("Profile updated");
      setEditing(false);
    },
    onError: () => {
      Swal.fire("Update failed");
    },
  });

  return (
    <div className="border p-4 rounded shadow mb-4">
      <div className="flex items-center gap-4">
        <img
          src={photoURL || "/default-avatar.png"}
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
                value={photoURL}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold">{name}</h3>
              <p className="text-sm text-gray-600">{users.email}</p>
            </>
          )}

          <div className="mt-2">
            <span className={`badge ${users.role === 'Admin' ? 'badge-error' : users.role === 'Agent' ? 'badge-info' : 'bg-gradient-to-b from-sky-400 to-blue-600 text-white'}`}>{users.role}</span>
          <p className="text-xs mt-1 text-gray-500">Last Login:{new Date(users.
last_log_in).toLocaleString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
})} </p>
          </div>
        </div>
        <div>
          {editing ? (
            <button className="btn btn-sm btn-success" onClick={() => updateProfile.mutate()}>Save</button>
          ) : (
            <button className="btn bg-gradient-to-b from-sky-400 to-blue-600 text-white btn-sm" onClick={() => setEditing(true)}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

const UserProfiles = () => {
  const { data: userdata = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("https://life-insurance-management-server.vercel.app/users");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">User Profiles</h2>
      <div className="grid grid-cols-2 gap-4">
        {userdata.map((users) => (
        <UserProfileCard key={users._id} users={users} />
      ))}

      </div>
     
    </div>
  );
};

export default UserProfiles;
