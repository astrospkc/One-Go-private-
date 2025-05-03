"use client"
import axios from "axios";

export default async function getAllProjects(token: string) {

    const response = await axios.get("http://localhost:8000/project/getAllProject", {
        headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }
    )
    if (response.status == 200) {
        return response.data
    }
    throw new Error("failed to fetch data")
}

