"use client"
import React, { createContext, useState } from "react";
import { User, UserContextType } from "../../types";

const defaultValue: UserContextType = {
    setIsAuthenticated: () => { },
    isAuthenticated: false,
    user: {
        id: "",
        name: "",
        email: "",
        profile_pic: "",
        password: "",
        role: "",
        api_key: ""
    },
    setUser: () => { },
    isUserLoading: false,
    setIsUserLoading: () => { }
};


export const UserContext = createContext<UserContextType>(defaultValue)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [isUserLoading, setIsUserLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<User>({
        id: "",
        name: "",
        email: "",
        profile_pic: "",
        password: "",
        role: "",
        api_key: ""
    })






    return (
        <UserContext.Provider value={{
            setIsAuthenticated, isAuthenticated, user, setUser, isUserLoading, setIsUserLoading

        }}>
            {children}
        </UserContext.Provider>
    )
}




