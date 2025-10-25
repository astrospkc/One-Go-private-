
// import axios from "axios";

import axios from "axios"

export default async function getAllCollection() {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/collection/getAllCollection`


    const response = await axios.get(url, {
        withCredentials: true
    })


    if (response.status == 200) {

        return response.data
    }
    throw new Error("failed to fetch data")
}

