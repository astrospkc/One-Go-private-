export type User = {
    id: string;
    name: string;
    email: string;
    profile_pic: string;
    password: string;
    role: string;
    api_key: string;
}
interface UserContextType {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    isAuthenticated: boolean;
    user: {
        id: string;
        name: string;
        email: string;
        profile_pic: string;
        password: string;
        role: string;
        api_key: string;
    };
    setUser: React.Dispatch<React.SetStateAction<{
        id: string;
        name: string;
        email: string;
        profile_pic: string;
        password: string;
        role: string;
        api_key: string;
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
    time: string
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
export interface Project {
    id?: string; // corresponds to ObjectID (optional because of `omitempty`)
    user_id: string;
    collection_id: string;
    title: string;
    description?: string;
    tags?: string;
    thumbnail?: string;
    githublink?: string;
    liveddemolink?: string;
    time: string; // or `Date` if you convert it properly
}

export interface Media {
    id: string;             // MongoDB ObjectID comes as string
    user_id: string;
    collection_id: string;   // also ObjectID as string
    key: string;
    title: string;
    content: string;
    time: string;            // or Date, depending on how you parse it
}

export interface Blog {
    id?: string;                  // ObjectID from MongoDB, usually a string
    user_id: string;
    collection_id: string;        // Also ObjectID → string
    title: string;
    description: string;
    content: Record<string, string | number | boolean>; // Represents map[string]interface{}
    tags?: string;
    coverImage?: string;
    published: string;            // or `Date` if you parse it
    time: string;                 // createdAt in Go is labeled "time" in JSON
    lastedited: string;           // or `Date` — field name matches JSON tag
    status: string;
}

export type { UserContextType, ModalContextType, CollectionContextType }
