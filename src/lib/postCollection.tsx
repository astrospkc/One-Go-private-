"use client"
import axios from "axios"

export default async function postCollection(body: { Title: string; Description: string }) {
    try {

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/collection/createCollection`, body, {
            withCredentials: true
        }
        )
        const info = await response.data
        return info
    } catch (error) {
        return error
        // throw new Error("Failed to Create new Collection",error)
    }
}