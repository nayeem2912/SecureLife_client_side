
import React from "react";
import useAuth from "../hooks/useAuth";

const ProfileCard = () => {
    const{user}=useAuth()
    
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl p-6 text-center border">
      <div className="flex justify-center">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="w-24 h-24 rounded-full border-4 border-sky-400 shadow-md"
        />
      </div>
      <h2 className="mt-4 text-xl font-semibold text-gray-800">{user.displayName}</h2>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
};

export default ProfileCard;
