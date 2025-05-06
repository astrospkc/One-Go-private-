import axios from "axios";

export default async function getAllBlogs(token: string, col_id: string) {

    const response = await axios.get(`http://localhost:8000/blog/readAllBlogWithCol_id/${col_id}`, {
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