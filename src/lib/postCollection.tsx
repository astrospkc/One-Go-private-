"use client"
import axios from "axios"

export default async function postCollection(token: string, body: { Title: string; Description: string }) {
    try {

        const response = await axios.post(`http://ocalhost:8000/collection/createCollection`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        )
        const info = await response.data
        return info
    } catch (error) {
        throw new Error("Failed to Create new Collection")
    }
}