"use client"
import React, { createContext, useEffect, useState } from "react";
import { UserContextType } from "../../types";
import axios from "axios";
const defaultValue: UserContextType = {
    setIsAuthenticated: () => { },
    isAuthenticated: false,
    user: {
        Name: "",
        Email: "",
        ProfilePic: "",
        Password: "",
        Role: ""
    },
    setUser: () => { },
    isUserLoading: false,
    setIsUserLoading: () => { }
};


export const UserContext = createContext<UserContextType>(defaultValue)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [isUserLoading, setIsUserLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState({
        name: "",
        email: "",
        profilePic: "",
        password: "",
        role: ""
    })




    console.log("authenticated, userloading", isAuthenticated, isUserLoading)


    return (
        <UserContext.Provider value={{
            setIsAuthenticated, isAuthenticated, user, setUser, isUserLoading, setIsUserLoading

        }}>
            {children}
        </UserContext.Provider>
    )
}




