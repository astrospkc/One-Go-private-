import { create } from "zustand"
import { ProjectContextType } from "../../types"

const useProjectStore = create<ProjectContextType>((set) => ({
    project: [],
    setProject: (project) => set({ project }),
    projectLoading: false,
    setProjectLoading: (value) => set({ projectLoading: value })
}))

export default useProjectStore