"use client";
import { useUserStore } from "@/store/useAuthStore";
import React from "react";

const DashboardPage = () => {
  const { user } = useUserStore();

  return <div>{user?.firebaseUserId || "User is Loading.."}</div>;
};

export default DashboardPage;
