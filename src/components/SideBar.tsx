"use client";
import Link from "next/link";
import { FaFolder, FaPlusCircle, FaThLarge, FaUserCog } from "react-icons/fa";

import { useContext } from "react";
import { ModalContextapp } from "@/context/ModalProvider";

const SideBar = () => {
    const { open, setOpen } = useContext(ModalContextapp)
    const handleClick = () => {
        setOpen(!open)
    }


    return (
        <div className="w-[20%] min-h-screen bg-transparent text-white p-6 flex flex-col gap-6 border-r-2 border-violet-500 shadow-xl shadow-slate-800 font-serif">
            <h2 className="text-xl font-bold mb-6">Dashboard</h2>
            <h3 className="text-xl font-bold mb-6">Home</h3>

            <nav className="flex flex-col gap-4 text-sm">
                <div>
                    <Link href="/dashboard/apiDocumentation">
                        <div className="flex items-center gap-3 cursor-pointer hover:text-violet-400">
                            <FaFolder />
                            <span>API Documentation</span>
                        </div>
                    </Link>

                </div>

                <div className=" cursor-pointer hover:text-violet-400">
                    <Link href={'/dashboard/userSetting'} >
                        <div className="flex items-center gap-3">
                            <FaUserCog />
                            <span>User Settings</span>
                        </div>
                    </Link>
                </div>

                <div className=" mt-10 text-center font-bold text-xl">Collection</div>
                <div className="flex gap-4 flex-col">
                    <div className="flex items-center gap-3 cursor-pointer hover:text-violet-400">
                        <FaThLarge />
                        <Link href="/dashboard/collections">
                            <span>All</span>
                        </Link>

                    </div>
                    <div className="flex items-center gap-3 cursor-pointer hover:text-violet-400">
                        <FaPlusCircle />
                        <span onClick={handleClick} className="text-gray-500 hover:text-white hover:cursor-pointer">Create Collection...</span>

                    </div>
                </div>


            </nav>
        </div>
    );
};

export default SideBar;
