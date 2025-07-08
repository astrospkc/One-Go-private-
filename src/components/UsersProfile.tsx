"use client"
import React, { useState } from 'react'
import { User } from '../../types'
// import { User } from '../../types'

interface UsersProps {
    props: {
        user: User
    }
}

const UsersProfile = ({ props }: UsersProps) => {
    const { user } = props
    const [edit, setEdit] = useState(false)
    const [userData, setUserData] = useState({
        id: user.id,
        name: user.name,
        email: user.email,
        profile_pic: user.profile_pic,
        role: user.role,
        api_key: user.api_key
    })
    const [file, setFile] = useState<File | null>()
    const handleEdit = async () => {
        const token = localStorage.getItem('token')
        const formData = new FormData()

        setEdit(edit => !edit)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/editUser`, {
            method: "PUT",
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            },

        })
        const data =
            console.log("edit: ", edit)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { id, value } = e.target
        setUserData((prev) => ({ ...prev, [id]: value }))
    }
    return (
        <div>
            <div className='flex flex-row  my-3 md:my-5 bg-black p-3 '>
                <div className='flex-1 flex-col md:flex-row shadow-sm shadow-violet-500 mx-3 p-3 rounded-4xl'>
                    <div className=' flex flex-col justify-center items-center px-5' >
                        <div className=' h-40 w-40 rounded-full bg-black border-2 shadow-lg shadow-violet-400'></div>
                        {!edit &&
                            <div className='mt-5 flex flex-col'>
                                <label htmlFor="" className='text-bold text-sm md:text-lg'>Upload photo</label>
                                <InputField type="file"
                                    disabled={edit}
                                    value={userData.profile_pic}
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
    onChange: any;
    value: string;

}

function InputField({ id, value, type, disabled, onChange }: InputFieldProps) {
    return (
        <InputField
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

export default UsersProfile
