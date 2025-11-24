import axios from "axios"
import { Project } from "../../types"


export type ProjectPayload = {
    id?: string,
    user_id?: string,
    title: string,
    description: string,
    tags: string
    fileUpload: string[],
    githublink: string
    demolink: string,
    liveUrl: string,
    blogLink: string,
    teamMembers: string,
    collection_id: string,
    thumbnail?: string,
    created_at?: string,
    updated_at?: string

}
type ProjectResponse = {
    data: ProjectPayload | null,
    success: boolean
}
type ProjectReadResponse = {
    data: ProjectPayload | null,
    code: number
}

type ProjectReadAllResponse = {
    data: Project[] | null,
    code: number
}

type GetAllProjectResponse = {
    data: Project[] | null,
    code: number
}

const projectService = {
    async getPresignedUrls(fileKey: string[]) {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/presignedUrl`, {
                fileKey
            },
                {
                    headers: {
                        // 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }

            )
            console.log("response: ", res, res.data)
            const urls = await res.data
            return urls
        } catch (error) {
            console.error("Error fetching presigned urls of files ", error)
            return error
        }
    },

    async createProject(col_id: string, projectData: ProjectPayload): Promise<ProjectResponse> {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/createProject/${col_id}`, projectData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`

                },
            })

            const data = await res.data
            return {
                data,
                success: true
            }
        } catch (error) {
            console.log("Error creating project", error)
            return {
                data: null,
                success: false
            }
        }
    },


    async readProject(project_id: string): Promise<ProjectReadResponse> {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/readProject/${project_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`

                },
            })

            const data = await res.data
            console.log("project data: ", data)
            return {
                data: data.project,
                code: 200
            }
        } catch (error) {
            console.log("Error reading project", error)
            return {
                data: null,
                code: 500
            }
        }
    },

    async getAllProjectOfCollectionId(col_id: string): Promise<ProjectReadAllResponse> {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/collectionProject/${col_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`

                },
            })

            const projectRes = await res.data
            const data = projectRes.projects
            return {
                data,
                code: projectRes.code
            }
        } catch (error) {
            console.log("Error reading project", error)
            return {
                data: null,
                code: 500
            }
        }
    },

    async getAllProjects(): Promise<GetAllProjectResponse> {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`

                },
            })

            const projectRes = await res.data
            const data = projectRes.projects
            console.log("project data: ", data)
            return {
                data,
                code: projectRes.code
            }
        } catch (error) {
            console.log("Error reading project", error)
            return {
                data: null,
                code: 500
            }
        }
    }
}

export default projectService