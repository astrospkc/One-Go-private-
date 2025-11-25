import { create } from "zustand"
import { ProjectContextType } from "../../types"



const useProjectStore = create<ProjectContextType>((set) => ({
    project: [],
    setProject: (project) =>
        set((state) => ({
            project: typeof project === "function"
                ? project(state.project) // callback version
                : project                // direct value
        })),
    projectLoading: false,
    setProjectLoading: (value) => set({ projectLoading: value })
}))

export default useProjectStore