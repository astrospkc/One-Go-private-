"use client"


export default async function getAllProjects(token: string) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/getAllProject`
    const response = await fetch(url, {
        method: "GET",
        headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }
    )
    if (response.status == 200) {
        return response.json()
    }
    throw new Error("failed to fetch data")
}

