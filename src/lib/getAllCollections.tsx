
// import axios from "axios";


export default async function getAllCollection() {
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/collection/getAllCollection`
        const response = await fetch(url, {
            method: "GET",
            credentials: "include",

        })
        console.log("response collections: ", response)

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error fetching collection data:", error);
        throw new Error("failed to fetch data")
    }

}

