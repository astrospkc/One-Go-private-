import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PaymentContextType, SubscriptionType } from "../../types";



export const usePaymentStore = create<PaymentContextType>()(
    persist((set) => ({
        plan: "",
        isActive: false,
        subscriptionData: {} as SubscriptionType,
        setPlan: (plan: string) => set({ plan }),
        setIsActive: (status: boolean) => set({ isActive: status }),
        setSubscriptionData: (data: SubscriptionType) => set({ subscriptionData: data }),

    }),
        {
            name: "payment-store",
        }

    ))