
let baseUrl = "";

const NEXT_PUBLIC_BACKEND_DEV_URL = process.env.NEXT_PUBLIC_BACKEND_DEV_URL
const NEXT_PUBLIC_BACKEND_PROD_URL = process.env.NEXT_PUBLIC_BACKEND_PROD_URL
// This function will be called when the code runs on the client side

const getBaseUrl = () => {
    // In browser environments
    if (typeof window !== "undefined") {
        return window.location.hostname === "localhost"
            ? NEXT_PUBLIC_BACKEND_DEV_URL || ""
            : NEXT_PUBLIC_BACKEND_PROD_URL || "";
    }
    // For server-side or build time
    return NEXT_PUBLIC_BACKEND_PROD_URL || "";
};

// Set the baseUrl when the module loads
baseUrl = getBaseUrl();


// For debugging - this will only run on the client side
if (typeof window !== "undefined") {
    console.log("Current hostname:", window.location.hostname);
    console.log("Using base URL:", baseUrl);
}

export default baseUrl;