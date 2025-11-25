import { create } from "zustand"
import { persist } from "zustand/middleware"
import { AuthState } from "../../types"

export const useAuthStore = create<AuthState>()(
    persist((set) => ({
        user: null,
        isAuthenticated: false,
        userLoading: false,
        setUser: (user) => set({ user }),
        setIsAuthenticated: (value) => set({ isAuthenticated: value }),
        setUserLoading: (value) => set({ userLoading: value }),
        logout: () => set({ user: null, isAuthenticated: false }),
    }),
        {
            name: "auth-store",
        }
    )

)
