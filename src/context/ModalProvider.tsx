"use client"
import React, { createContext, useState } from "react";

import { ModalContextType } from "../../types";
const defaultValue: ModalContextType = {
    open: false,
    setOpen: () => { },
    openProjectModal: false,
    setOpenProjectModal: () => { },

}

export const ModalContextapp = createContext<ModalContextType>(defaultValue)
export const ModalProviderapp = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false)
    const [openProjectModal, setOpenProjectModal] = useState(false)

    return (
        <ModalContextapp.Provider value={{ open, setOpen, openProjectModal, setOpenProjectModal }}>
            {children}
        </ModalContextapp.Provider>
    )
}