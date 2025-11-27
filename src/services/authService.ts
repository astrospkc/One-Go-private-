// login
// logout
// signup
// signin
// googleSignIn
// forgotPassword
// resetPassword
// "use client"
import axios from "axios"

import baseUrl from "./api"

interface LoginResponse {
    token: string,
    user: {
        id: string,
        name: string,
        email: string,
        profile_pic?: string,
        role: string,
        api_key: string
    }
}

// interface RegisterSendOtpResponse {
//     message: string,
//     email: string,
//     otp: string
// }

interface RegisterPayload {
    name: string,
    email: string,
    password: string,
    role?: string,
    file?: string
}

interface UserResponse {
    id: string,
    name: string,
    email: string,
    profile_pic?: string,
    role: string,
    api_key: string
}

interface RegisterVerifyOtpResponse {
    message: string,
    token: string,
    user: UserResponse,
    code: number
}

interface Forgot_ResetPasswordResponse {
    message: string,
    code: number
}

const NEXT_PUBLIC_BACKEND_DEV_URL = process.env.NEXT_PUBLIC_BACKEND_DEV_URL
const NEXT_PUBLIC_BACKEND_PROD_URL = process.env.NEXT_PUBLIC_BACKEND_PROD_URL
export const authService = {

    // login
    async login(email: string, password: string): Promise<LoginResponse> {
        try {
            console.log(process.env.WITH)
            console.log("base url: ", baseUrl, window.location.hostname, NEXT_PUBLIC_BACKEND_DEV_URL, NEXT_PUBLIC_BACKEND_PROD_URL)
            const response = await axios.post(`${baseUrl}/auth/login`, { email, password })
            const { token, user } = response.data
            return { token, user }
        } catch (error) {
            throw error
        }
    },

    // register 
    async registerSendOtp(payload: RegisterPayload): Promise<void> {
        try {
            const formData = new FormData()
            formData.append('name', payload.name)
            formData.append('email', payload.email)
            formData.append('password', payload.password)
            formData.append('role', payload.role || 'user')
            if (payload.file) {
                formData.append('file', payload.file)
            }
            await axios.post(`${baseUrl}/auth/register/send-otp`, formData)
            // const { message, email } = response.data
            return
        } catch (error) {
            throw error
        }
    },

    async registerVerifyOtp(email: string, otp: string): Promise<RegisterVerifyOtpResponse> {
        try {
            const response = await axios.post(`${baseUrl}/auth/register/verify-otp`, { email, otp })
            const { message, token, user, code } = response.data
            return { message, token, user, code }
        } catch (error) {
            throw error
        }
    },

    async forgotPassword(email: string): Promise<Forgot_ResetPasswordResponse> {
        try {
            const response = await axios.post(`${baseUrl}/auth/forgot-password`, { email })
            const { message, code } = response.data
            return { message, code }
        } catch (error) {
            throw error
        }
    },

    async resetPassword(email: string, newPassword: string, confirmPassword: string, otp: string): Promise<Forgot_ResetPasswordResponse> {
        try {
            const response = await axios.post(`${baseUrl}/auth/reset-password`, { email, otp, newPassword, confirmPassword })
            const { message, code } = response.data
            return { message, code }
        } catch (error) {
            throw error
        }
    },

    async getUser() {
        try {
            const response = await axios.get(`${baseUrl}/auth/user`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const { user } = response.data
            return user
        } catch (error) {
            throw error
        }
    }
}