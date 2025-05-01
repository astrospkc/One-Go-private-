"use client"
import ApiKeyPage from '@/components/ApiKeyPage'
import BillingPage from '@/components/BillingPage'
import UsersProfile from '@/components/UsersProfile'
import { UserContext } from '@/context/UserProvider'
import { title } from 'process'
import React, { useContext, useState } from 'react'

const settingSections = [
    {
        id: 1,
        title: "User Profile",
    },
    {
        id: 2,
        title: "API Key",
    },
    {
        id: 3,
        title: "Billing",
    },
]

const UsersPage = () => {
    const { user } = useContext(UserContext)
    const [openedSection, setOpenedSection] = useState(settingSections[0].title)
    console.log("user: ", user)
    const handleSection = (e: any) => {
        setOpenedSection(e.target.innerText)
    }


    return (
        <>
            <div className='flex flex-col  m-10 font-serif my-10 '>
                <div className='flex flex-col  '>
                    <span className='text-xl md:text-4xl font-bold'>
                        USERS-SETTINGS
                    </span>
                    <div className='w-1/2 flex justify-between my-5 text-xl border-b-2 border-gray-600'>
                        {settingSections && settingSections.map((section) => (
                            <span
                                onClick={handleSection}
                                key={section.id} className='hover:bg-violet-400 hover:text-black hover:scale-75 rounded-3xl p-2 hover:cursor-pointer'>{section.title}</span>
                        ))}

                    </div>
                    {
                        openedSection === "User Profile" ?
                            <UsersProfile props={{ user }} /> :
                            (openedSection === "API Key" ? <ApiKeyPage props={{ user }} /> : <BillingPage />)

                    }

                </div>

            </div>
        </>

    )
}

export default UsersPage
