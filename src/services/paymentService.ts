import axios from "axios"
import baseUrl from "./api"

type PlanPayload = {
    plan: string
}
export const paymentService = {
    async createPaymentLink(plan: PlanPayload, token: string) {
        try {

            const res = await axios.post(`${baseUrl}/payment/subscription/createPaymentLink`, plan,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            const { success, data } = res.data
            return { success, data }

        } catch (error) {
            throw error
        }
    },

    async subscriptionActive(token: string, queries: any) {
        const { RazorpayPaymentId, RazorpayPaymentLinkId, RazorpayPaymentLinkReferenceId, RazorpayPaymentLinkStatus, RazorpaySignature } = queries
        const query = `razorpay_payment_id=${RazorpayPaymentId}&razorpay_payment_link_id=${RazorpayPaymentLinkId}&razorpay_payment_link_reference_id=${RazorpayPaymentLinkReferenceId}&razorpay_payment_link_status=${RazorpayPaymentLinkStatus}&razorpay_signature=${RazorpaySignature}`
        try {
            const res = await axios.get(`${baseUrl}/payment/subscription/success?${query}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const { success, message } = await res.data
            return { success, message }
        } catch (error) {
            throw error
        }
    }
}