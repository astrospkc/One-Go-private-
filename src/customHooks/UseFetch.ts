// import { useEffect, useState } from "react"

// const useFetch = ( type: string) => {
//     const [user, setUser] = useState({
//         Name: "",
//         Email: "",
//         Password: "",
//         ProfilePic: "",
//         Role: ""
//     })

//     useEffect(() => {
//         if (type === "signin") {
//             const url = "http://localhost:8080/api/login"
//             fetch(url).then((res) => res.json()).then((data) => setUser(data.user))

//         } else if (type === "signup") {
//             const url = "http://localhost:8080/api/createUser"
//             fetch(url).then((res) => res.json()).then((data) => setUser(data.user))
//         }
//     }, [type])

//     return [user]
// }

// export default useFetch