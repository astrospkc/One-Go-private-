"use client"

import { CollectionContextType } from "../../types";
import { createContext, useState } from "react";

const defaultValue: CollectionContextType = {
    collection: [],
    setCollection: () => { },
}

export const CollectionContext = createContext<CollectionContextType>(defaultValue);

export const CollectionProvider = ({ children }: { children: React.ReactNode }) => {
    const [collection, setCollection] = useState([])



    return (
        <CollectionContext.Provider value={{ collection, setCollection }}>
            {children}

        </CollectionContext.Provider>

    )
}


