import React from "react";
import firebase from "firebase-admin";
import { verifyTokenAndFetchUserInfo } from "@/utils/authUtils";

const DashboardPage = async () => {
  const { userInfo, error, message } = await verifyTokenAndFetchUserInfo();

  if (error) {
    return (
      <div>
        <h1>{error}</h1>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>Name: {userInfo.name}</p>
      <p>Email: {userInfo.email}</p>
      {/* Render other user details here */}
    </div>
  );
};

// Function to refresh the ID token using the refresh token
async function refreshIdToken(refreshToken: string): Promise<string> {
  const app =
    firebase.apps.length > 0 ? firebase.app() : firebase.initializeApp();
  const authClient = app.auth();

  const user = await authClient.verifyIdToken(refreshToken); // Using refresh token to get a new ID token
  const newToken = await user.getIdToken();

  return newToken;
}

async function fetchUserInfo(firebaseUserId: string): Promise<any> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${firebaseUserId}`;

  const response = await fetch(apiUrl, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Error fetching user info: ${response.statusText}`);
  }

  return await response.json();
}

export default DashboardPage;
