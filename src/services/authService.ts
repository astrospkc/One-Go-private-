// login
// logout
// signup
// signin
// googleSignIn
// forgotPassword
// resetPassword

import axios from "axios"
import { User } from "../../types"
import { baseUrl } from "./api"

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

interface RegisterSendOtpResponse {
    message: string,
    email: string,
    otp: string
}

interface RegisterPayload {
    name: string,
    email: string,
    password: string,
    role?: string,
    file?: File
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
    user: UserResponse | null,
    code: number
}

interface Forgot_ResetPasswordResponse {
    message: string,
    code: number
}
export const authService = {

    // login
    async login(email: string, password: string): Promise<LoginResponse> {
        try {

            const response = await axios.post(`${baseUrl}/login`, { email, password })
            const { token, user } = response.data
            return { token, user }
        } catch (error) {
            throw error
        }
    },

    // register 
    async registerSendOtp(payload: RegisterPayload): Promise<RegisterSendOtpResponse> {
        try {
            const formData = new FormData()
            formData.append('name', payload.name)
            formData.append('email', payload.email)
            formData.append('password', payload.password)
            formData.append('role', payload.role || 'user')
            if (payload.file) {
                formData.append('file', payload.file)
            }
            const response = await axios.post(`${baseUrl}/auth/register/send-otp`, formData)
            const { message, email, otp } = response.data
            return { message, email, otp }
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

    async resetPassword(email: string, password: string, otp: string): Promise<Forgot_ResetPasswordResponse> {
        try {
            const response = await axios.post(`${baseUrl}/auth/reset-password`, { email, password, otp })
            const { message, code } = response.data
            return { message, code }
        } catch (error) {
            throw error
        }
    },
}