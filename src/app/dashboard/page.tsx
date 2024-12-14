import React from "react";
import { cookies } from "next/headers";
import { auth } from "@/lib/firebase/firebaseAdmin";

const DashboardPage = async () => {
  const cookieStore = await cookies(); // Await the cookies() call
  const token = cookieStore.get("token")?.value;

  if (!token) {
    // Handle unauthorized access (redirect to login)
    return (
      <div>
        <h1>Unauthorized</h1>
        <p>Please log in to access this page.</p>
      </div>
    );
  }

  try {
    // Verify the token with Firebase Admin SDK to get the user's UID
    const decodedToken = await auth.verifyIdToken(token);
    const { uid } = decodedToken;

    return (
      <div>
        <h1>Welcome to your dashboard</h1>
        <p>Your UID: {uid}</p>
      </div>
    );
  } catch (error) {
    console.error("Token verification failed:", error);

    return (
      <div>
        <h1>Authentication Failed</h1>
        <p>There was an issue verifying your session. Please log in again.</p>
      </div>
    );
  }
};

export default DashboardPage;
