
interface UserContextType {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    isAuthenticated: boolean;
    user: {
        Name: string;
        Email: string;
        ProfilePic: string;
        Password: string;
        Role: string;
    };
    setUser: React.Dispatch<React.SetStateAction<{
        Name: string;
        Email: string;
        ProfilePic: string;
        Password: string;
        Role: string;
    }>>;
    isUserLoading: boolean;
    setIsUserLoading: React.Dispatch<React.SetStateAction<boolean>>
}


interface ModalContextType {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    openProjectModal: boolean,
    setOpenProjectModal: React.Dispatch<React.SetStateAction<boolean>>
}


export type SingleCollection = {
    id: string,
    title: string,
    description: string
    createdAt: string
}

interface CollectionContextType {
    collection: SingleCollection[]
    setCollection: (collection: SingleCollection[]) => void
}
export type CollectionType = {
    description: string
    id: string
    time: string
    title: string
    user_id: string
}

export type { UserContextType, ModalContextType, CollectionContextType }
