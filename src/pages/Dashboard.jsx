import React from 'react';
import { NavLink } from 'react-router';

const Dashboard = () => {
    return (
        <div>
           <div className="flex flex-col justify-between h-screen p-3 w-60 bg-white text-gray-800 shadow-md">
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <button className="p-2">
        {/* Hamburger icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current text-gray-800">
          <rect width="352" height="32" x="80" y="96"></rect>
          <rect width="352" height="32" x="80" y="240"></rect>
          <rect width="352" height="32" x="80" y="384"></rect>
        </svg>
      </button>
    </div>

    {/* Search Box */}
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center py-4">
        <button type="submit" className="p-2 focus:outline-none focus:ring">
          <svg fill="currentColor" viewBox="0 0 512 512" className="w-5 h-5 text-gray-600">
            <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014..." />
          </svg>
        </button>
      </span>
      <input
        type="search"
        name="Search"
        placeholder="Search..."
        className="w-full py-2 pl-10 text-sm border rounded-md focus:outline-none bg-gray-100 text-gray-800"
      />
    </div>

    {/* Menu Items */}
    <div className="flex-1">
      <ul className="pt-2 pb-4 space-y-1 text-sm">
        <li className="rounded-sm">
          <a href="/" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-200 transition">
            <span>🏠</span>
           <span>Home</span>
          </a>
        </li>
        <li className="rounded-sm">
          <a href="#" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-200 transition">
            <span>🔍</span>
            <span>Search</span>
          </a>
        </li>
        <li className="rounded-sm">
          <a href="#" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-200 transition">
            <span>💬</span>
            <span>Chat</span>
          </a>
        </li>
        <li className="rounded-sm">
          <a href="#" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-200 transition">
            <span>🛍️</span>
            <span>Orders</span>
          </a>
        </li>
        <li className="rounded-sm">
          <a href="#" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-200 transition">
            <span>❤️</span>
            <span>Wishlist</span>
          </a>
        </li>
        <li className="rounded-sm">
          <a href="#" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-200 transition">
            <span>⚙️</span>
            <span>Settings</span>
          </a>
        </li>
        <li className="rounded-sm">
          <a href="#" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-200 transition">
            <span>🚪</span>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </div>

  {/* User Profile at Bottom */}
  <div className="flex items-center p-2 space-x-4">
    <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-12 h-12 rounded-lg" />
    <div>
      <h2 className="text-lg font-semibold">Leroy Jenkins</h2>
      <a href="#" className="text-xs text-gray-600 hover:underline">
        View profile
      </a>
    </div>
  </div>
</div>

        </div>
    );
};

export default Dashboard;