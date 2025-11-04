import { create } from "zustand";
import { CollectionContextType } from "../../types";

const useCollectionStore = create<CollectionContextType>((set) => ({
    collection: [],
    setCollection: (data) => set({ collection: data }),
    collectionLoading: false,
    setCollectionLoading: (value) => set({ collectionLoading: value }),
}));


export default useCollectionStore;