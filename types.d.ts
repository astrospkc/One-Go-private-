export type User = {
    id: string;
    name: string;
    email: string;
    profile_pic?: string;
    password?: string;
    role: string;
    api_key: string;
}
export type UserContextType = {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    isAuthenticated: boolean;
    user: {
        id: string;
        name: string;
        email: string;
        profile_pic: string;
        password?: string;
        role: string;
        api_key: string;
    };
    setUser: React.Dispatch<React.SetStateAction<{
        id: string;
        name: string;
        email: string;
        profile_pic: string;
        password?: string;
        role: string;
        api_key: string;
    }>>;
    isUserLoading: boolean;
    setIsUserLoading: React.Dispatch<React.SetStateAction<boolean>>
}


export type ModalContextType = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    openProjectModal: boolean,
    setOpenProjectModal: React.Dispatch<React.SetStateAction<boolean>>
}


export type SingleCollection = {
    id: string,
    user_id: string,
    title: string,
    description: string,
    created_at: string,
    updated_at: string
}

export type CollectionContextType = {
    collection: SingleCollection[] | [],
    setCollection: (collection: SingleCollection[]) => void,
    collectionLoading: boolean,
    setCollectionLoading: (value: boolean) => void
}

export type Project = {
    id?: string,
    user_id?: string,
    collection_id: string,
    title: string,
    description?: string,
    tags?: string,
    fileUpload?: string
    thumbnail?: string,
    githublink?: string,
    demolink?: string
    livedemolink?: string,
    blogLink?: string,
    teamMembers?: string,
    created_at: string,
    updated_at: string
}

export type ProjectContextType = {
    project: Project[] | null,
    setProject: (project: Project[] | null) => void,
    projectLoading: boolean,
    setProjectLoading: (value: boolean) => void
}


export type CollectionType = {
    description: string
    id: string
    time: string
    title: string
    user_id: string
}
export type Project = {
    blogLink: string
    collection_id: string
    demolink?: string
    description?: string
    fileUpload?: string
    githublink?: string
    id: string
    livedemolink?: string
    tags?: string
    teamMembers?: string
    thumbnail?: string
    time: Date
    title: string
    user_id: string
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


export type AuthState = {
    user: User | null,
    isAuthenticated: boolean,
    userLoading: boolean,
    setUser: (user: User) => void,
    setIsAuthenticated: (value: boolean) => void,
    setUserLoading: (value: boolean) => void,
    logout: () => void,
};

