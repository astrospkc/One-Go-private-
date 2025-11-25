let baseUrl = "";

// Check if window is defined (client-side)
if (typeof window !== "undefined") {
    if (window.location.hostname === "localhost") {
        baseUrl = process.env.NEXT_PUBLIC_BASE_DEV_URL || "";
    } else {
        baseUrl = process.env.NEXT_PUBLIC_BASE_PROD_URL || "";
    }
} else {
    // Fallback for server-side rendering
    baseUrl = process.env.NEXT_PUBLIC_BASE_PROD_URL || "";
}

export default baseUrl;