"use client"

import axios from "axios"


export default async function getAllProjects() {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/getAllProject`
    const response = await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    )
    console.log("response projects: ", response.data)
    if (response.status == 200) {
        return response.data
    }
    throw new Error("failed to fetch data")
}

