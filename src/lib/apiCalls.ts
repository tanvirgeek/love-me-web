import { useUserStore } from "@/store/useAuthStore";

export const fetchUser = async (firebaseUserId: string) => {
  try {
    const response = await fetch(`/api/users/${firebaseUserId}`);
    if (!response.ok) throw new Error("Failed to fetch user");

    const user = await response.json();
    useUserStore.getState().setUser(user); // Store user in Zustand
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};
