import axios from "axios"



type CollectionPayload = {
    Title: string,
    Description: string,
}

type CreateCollectionResponse = {
    id: string,
    user_id: string,
    title: string,
    description: string,
    created_at: string,
    updated_at: string
}
type GetAllCollectionResponse = {
    collections: CreateCollectionResponse[],
    code: number
}

export const collectionService = {
    async createCollection(payload: CollectionPayload): Promise<CreateCollectionResponse> {
        try {

            const { Title, Description } = payload
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/collection/createCollection`,
                {
                    Title,
                    Description,

                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                })
            return response.data
        } catch (error) {
            throw error as Error
        }
    },

    async getAllCollection(): Promise<GetAllCollectionResponse> {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/collection`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            const col_res = await response.data
            return {
                collections: col_res.collections,
                code: col_res.code
            }
        } catch (error) {
            throw error as Error
        }
    }
}