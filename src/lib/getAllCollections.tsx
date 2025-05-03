
import axios from "axios";

export default async function getAllCollection(token: string) {

    const response = await axios.get("http://localhost:8000/collection/getAllCollection", {
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

