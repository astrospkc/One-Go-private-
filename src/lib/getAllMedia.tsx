import axios from "axios"

export default async function getAllMedia(token: string, col_id: string) {
    const response = await axios.get(`http://localhost:8000/media/getALlMediaFiles/${col_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    if (response.status == 200) {
        return response.data
    }
    throw new Error("failed to fetch data")
}
