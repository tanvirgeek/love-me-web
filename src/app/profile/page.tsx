"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useAuthStore";

const UserProfile = () => {
  const user = useUserStore((state) => state.user);

  if (!user) return <div>No User Found...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Full Name: {user.userInfo?.fullName}</p>
      <h3>Favorites:</h3>
      {user.favorites?.length ? (
        <ul>
          {user.favorites.map((fav) => (
            <li key={fav.id}>{fav.favoriteFirebaseId}</li>
          ))}
        </ul>
      ) : (
        <p>No favorites yet</p>
      )}
    </div>
  );
};

export default UserProfile;
