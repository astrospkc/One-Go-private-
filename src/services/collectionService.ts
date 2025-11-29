import axios from "axios"
import { SingleCollection } from "../../types"
import baseUrl from "./api"



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

type GetCollectionByIdResponse = {
    collection: SingleCollection,
    code: number
}


export const collectionService = {
    async createCollection(payload: CollectionPayload, token: string): Promise<CreateCollectionResponse> {
        try {

            const { Title, Description } = payload
            const response = await axios.post(`${baseUrl}/collection`,
                {
                    Title,
                    Description,

                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
            return response.data
        } catch (error) {
            throw error as Error
        }
    },

    async getAllCollection(token: string): Promise<GetAllCollectionResponse> {
        try {
            const response = await axios.get(`${baseUrl}/collection`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
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
    },

    async getCollectionById(col_id: string, token: string): Promise<GetCollectionByIdResponse> {
        try {
            const response = await axios.get(`${baseUrl}/collection/${col_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const col_res = await response.data
            return {
                collection: col_res.collection,
                code: col_res.code
            }
        } catch (error) {
            throw error as Error
        }
    },

    async deleteCollectionById(col_id: string, token: string) {
        try {
            const response = await axios.delete(`${baseUrl}/collection/${col_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const col_res = await response.data
            return {
                message: col_res.message,
                code: col_res.code
            }
        } catch (error) {
            throw error as Error
        }
    },

    async deleteAllCollection(token: string) {
        try {
            const response = await axios.delete(`${baseUrl}/collection/deleteAllCollection`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const col_res = await response.data
            return {
                message: col_res.message,
                code: col_res.code
            }
        } catch (error) {
            throw error as Error
        }
    }


}
