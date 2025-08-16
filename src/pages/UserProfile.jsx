import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const UserProfileCard = ({ users }) => {
  return (
    <div className="border p-4 rounded shadow mb-4">
      <div className="text-center">
       <div className="flex justify-center">
         <img
          src={users.photoURL || "/default-avatar.png"}
          alt={users.name}
          className="w-16 h-16  rounded-full border"
        />
       </div>
        <div className="">
          <h3 className="text-lg font-bold">{users.name}</h3>
              <p className="text-sm text-gray-600">{users.email}</p>

          <div className="mt-2">
            <span className='badge bg-gradient-to-b from-sky-400 to-blue-600 text-white'>{users.role}</span>
          </div>
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
      <h2 className="text-2xl font-bold mb-4 text-center"></h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {userdata.map((users) => (
        <UserProfileCard key={users._id} users={users} />
      ))}

      </div>
     
    </div>
  );
};

export default UserProfiles;
