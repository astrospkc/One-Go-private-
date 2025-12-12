"use client"
import React, { useState } from 'react'
import { User } from '../../../../types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { authService } from '@/services/authService'

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

const UserSetting = () => {
    const { user, isAuthenticated } = useAuthStore()

    const [openedSection, setOpenedSection] = useState(settingSections[0].title)
    const handleSection = (e: React.MouseEvent<HTMLDivElement>) => {
        setOpenedSection((e.target as HTMLElement).innerText)
    }
    const router = useRouter()
    if (user && user.id === "" || isAuthenticated === false) {
        router.push("/auth/signIn")
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
                        user && (openedSection === "User Profile" ?
                            <UsersProfile props={{ user }} /> :
                            (openedSection === "API Key" ? <ApiKeyPage props={{ user }} /> : <BillingPage />))

                    }

                </div>

            </div>
        </>

    )
}

export default UserSetting

interface ApiKeyPageProps {
    props: {
        user: User
    }

}

const ApiKeyPage = ({ props }: ApiKeyPageProps) => {

    const { user } = props
    const [hide, setHide] = useState(true)

    const handleHide = () => {
        if (hide) {
            setHide(false)
        } else if (!hide) {
            setHide(true)
        }
    }

    const handleCopy = async (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied")
        })
    }

    return (
        <div>
            <div className='flex flex-col w-fit '>
                <label htmlFor="" className='font-bold'>API Key</label>

                <div>
                    {hide ? <></> :
                        <input
                            defaultValue={user.api_key}
                            type="text" className='p-2 border-2 border-gray-600 rounded-xl' />
                    }

                    {hide ?
                        <>
                            <button
                                onClick={handleHide}
                                className='bg-violet-400 p-2 rounded-xl mx-4 text-black font-bold hover:scale-90 hover:cursor-pointer' > Show API key</button>

                        </>

                        :
                        <>
                            <button
                                onClick={handleHide}
                                className='bg-violet-400 p-2 rounded-xl mx-4 text-black font-bold hover:scale-90 hover:cursor-pointer' > Hide API key</button>
                            <button
                                onClick={() => handleCopy(user.api_key)}
                                className='bg-violet-400 p-2 rounded-xl mx-4 text-black font-bold hover:scale-90 hover:cursor-pointer'
                            >
                                Copy
                            </button>
                        </>

                    }

                </div>
            </div>
        </div>
    )
}

const BillingPage = () => {
    return (
        <div>
            this is the billing page
        </div>
    )
}


interface UsersProps {
    props: {
        user: User
    }
}

const UsersProfile = ({ props }: UsersProps) => {
    const { user } = props
    const { token } = useAuthStore()
    const [edit, setEdit] = useState(false)
    const [userData, setUserData] = useState({
        id: user.id,
        name: user.name,
        email: user.email,
        profile_pic: user.profile_pic,
        password: user.password,
        role: user.role,
        api_key: user.api_key
    })
    const [file, setFile] = useState<File | null>()

    const handleEdit = async () => {
        const formData = new FormData();
        formData.append('id', userData.id);
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        if (file) {
            formData.append('profile_pic', file);
        }
        if (userData.password) {
            formData.append('password', userData.password);
        }
        formData.append('role', userData.role);
        formData.append('api_key', userData.api_key);
        setEdit(edit => !edit)
        await authService.editUser(token || '', formData)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { id, value } = e.target
        setUserData((prev) => ({ ...prev, [id]: value }))
    }
    return (
        <div>
            <div className='flex flex-row w-full  my-3 md:my-5 bg-black p-3  shaodow-lg shadow-violet-50  '>
                <div className='flex flex-col md:flex-row shadow-sm shadow-violet-500 mx-3 p-3 rounded-4xl'>
                    <div className=' flex flex-col justify-center items-center px-5' >
                        <div className='h-40 w-40 rounded-full bg-black  shadow-lg shadow-violet-400'></div>
                        {!edit &&
                            <div className='mt-5 flex flex-col'>
                                <label htmlFor="" className='text-bold text-sm md:text-lg'>Upload photo</label>
                                <InputField type="file"
                                    disabled={edit}
                                    value={userData.profile_pic || ""}
                                    className='bg-black'
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0])}
                                    id="profile_pic"
                                />
                            </div>
                        }


                        <div className=' grid grid-cols-2 gap-10  my-10 w-fit'>

                            <div className='flex flex-col'>
                                <label htmlFor="" className='mb-2 font-bold text-lg'>User Id:</label>
                                <InputField type="text"
                                    value={userData.id}
                                    disabled={edit}
                                    id="id"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className='mb-2 font-bold text-lg'>Username:</label>
                                <InputField type="text"
                                    disabled={edit}
                                    value={userData.name}
                                    id="name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className='mb-2 font-bold text-lg'>Email Address:</label>
                                <InputField type="email"
                                    disabled={edit}
                                    value={userData.email}
                                    id="email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className='mb-2 font-bold text-lg'>Role:</label>
                                <InputField type="text"
                                    disabled={edit}
                                    value={userData.role}
                                    id="role"
                                    onChange={handleChange}

                                />
                            </div>
                            {/* <div className='flex flex-col'>
                                <label htmlFor="" className='mb-2 font-bold text-lg'>Role:</label>
                                <InputField type="password"
                                    disabled={edit}
                                    value={userData.password}
                                    id="role"
                                    onChange={handleChange}

                                />
                            </div> */}
                            {/* <div className='flex flex-col'>
                                <label htmlFor="" className='mb-2 font-bold text-lg'>Phone number:</label>
                                <InputField type="text"
                                    disabled={edit}
                                    id=""
                                    onChange={handleChange}
                                    defaultValue={user.role} />
                            </div> */}
                        </div>
                        <div
                            onClick={handleEdit}
                            className='p-2 rounded-xl border-2 border-violet-400 font-bold hover:bg-violet-400 hover:text-black hover:scale-75 hover:cursor-pointer'>
                            {edit ? 'Save' : 'Edit'}
                        </div>
                    </div>
                </div>
                <div className=' flex border-l-2 justify-center w-full'>
                    Analytics
                </div>

            </div>
        </div>
    )
}

type InputFieldProps = {
    id: string;
    type: string;
    className?: string;
    disabled: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;

}

function InputField({ id, value, type, disabled, onChange }: InputFieldProps) {
    return (
        <input
            type={type}
            id={id}

            disabled={disabled}
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-2 rounded-md border ${disabled
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-white text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none'
                }`}
        />

    )
}
