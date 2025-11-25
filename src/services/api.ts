let baseUrl = ""
if (window.location.hostname === "localhost") {
    baseUrl = `${process.env.NEXT_PUBLIC_BASE_DEV_URL}`
} else {
    baseUrl = `${process.env.NEXT_PUBLIC_BASE_PROD_URL}`
}

export default baseUrl