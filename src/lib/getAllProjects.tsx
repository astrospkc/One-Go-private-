"use client"

import axios from "axios"


export default async function getAllProjects() {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/getAllProject`
    const response = await axios.get(url, {
        withCredentials: true
    }
    )
    if (response.status == 200) {
        return response.data
    }
    throw new Error("failed to fetch data")
}

