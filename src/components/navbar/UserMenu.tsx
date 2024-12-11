"use client";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userImage = "https://via.placeholder.com/150"; // Replace with user's image URL or set to null if unavailable

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("User logged out");
    // Example: Clear authentication tokens or session
  };

  return (
    <div className="relative">
      {/* Avatar as button to toggle dropdown */}
      <Avatar
        isBordered
        as="button"
        src={userImage || undefined}
        alt="User Avatar"
        fallback={
          <span className="flex items-center justify-center bg-gray-300 text-gray-600 rounded-full w-full h-full">
            U
          </span>
        }
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown visibility
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
          <span>
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)} // Close dropdown after clicking
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-t-lg"
            >
              Profile
            </Link>
          </span>

          {/* Logout Button */}
          <span>
            <button
              onClick={() => {
                setIsOpen(false); // Close dropdown
                handleLogout(); // Logout logic
              }}
              className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 rounded-b-lg"
            >
              Logout
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
