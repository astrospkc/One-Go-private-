"use client"
import { AnimatedModal } from "@/components/AnimatedModal";

import SideBar from "@/components/SideBar";
import { ModalContextapp } from "@/context/ModalProvider";
import { UserContext } from "@/context/UserProvider";
import { useContext } from "react";



export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { isAuthenticated } = useContext(UserContext)
    const { open } = useContext(ModalContextapp)
    console.log("isAuthenticated in dashboard: ", isAuthenticated)
    return (
        <>
            <div className="min-h-screen flex items-center justify-center relative w-full">
                <div
                    style={{
                        backgroundImage: 'url("/image/laptopplant.jpg")',
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat, repeat",
                        // backgroundColor: "rgb(34, 34, 34)",
                        // backgroundColor: "black",
                        backgroundBlendMode: "",
                        filter: "blur(1px)",
                        opacity: 0.2, // control background image opacity here
                        zIndex: 0,
                    }}
                    className="absolute inset-0"
                ></div>
                <div className=" flex flex-row w-full relative z-10">
                    <SideBar />

                    <div className="w-full overflow-y-scroll  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500 transition-all duration-300 ease-in-out">
                        {

                            open ?
                                <AnimatedModal />
                                :
                                <>
                                    {children}
                                </>
                        }


                    </div>

                </div>

            </div>
        </>
    );
}
