import { create } from "zustand";
import type { User, UserInfo, Favorite } from "@prisma/client"; // Import Prisma types

interface AuthState {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (authStatus: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: null, // initial state
  setIsAuthenticated: (authStatus: boolean) =>
    set({ isAuthenticated: authStatus }),
}));

type ExtendedUser = User & {
  userInfo?: UserInfo;
  favorites?: Favorite[];
  favoritedBy?: Favorite[];
};

type UserStore = {
  user: ExtendedUser | null;
  setUser: (user: ExtendedUser | null) => void;
  updateFavorites: (favorites: Favorite[]) => void;
  updateFavoritedBy: (favoritedBy: [Favorite]) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateFavorites: (favorites) =>
    set((state) => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          favorites,
        },
      };
    }),
  updateFavoritedBy: (favoritedBy) =>
    set((state) => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          favoritedBy,
        },
      };
    }),
}));
