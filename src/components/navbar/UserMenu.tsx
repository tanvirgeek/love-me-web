"use client";
import { auth } from "@/lib/firebase/firebase";
import { Avatar } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userImage = ""; // Replace with user's image URL or set to null if unavailable
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Signs the user out of Firebase
      console.log("User logged out");
      window.location.reload();
      // You can also add any additional logic here, e.g., redirecting the user
      // Example: Redirect to login page after logout
      // window.location.href = "/login"; // Or use Next.js routing if you prefer
    } catch (error) {
      if (error instanceof Error) {
        console.error("Logout error:", error.message);
      } else {
        console.error("Unknown error");
      }
    }
  };

  return (
    <div className="relative">
      {/* Avatar as button to toggle dropdown */}
      <Avatar
        isBordered
        as="button"
        src={userImage || undefined}
        alt="User Avatar"
        showFallback
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
