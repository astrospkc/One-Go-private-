import axios from "axios"


type ProjectPayload = {
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
    }
}

export default projectService