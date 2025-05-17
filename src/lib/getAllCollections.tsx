
// import axios from "axios";

export default async function getAllCollection(token: string) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/collection/getAllCollection`


    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })


    if (response.status == 200) {
        return response.json()
    }
    throw new Error("failed to fetch data")
}

