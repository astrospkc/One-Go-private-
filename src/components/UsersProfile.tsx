import React from 'react'
import { User } from '../../types'
// import { User } from '../../types'

interface UsersProps {
    props: {
        user: User
    }
}

const UsersProfile = ({ props }: UsersProps) => {
    const { user } = props
    return (
        <div>
            <div className='flex flex-row  my-3 md:my-5 bg-black p-3 '>
                <div className='flex-1 flex-col md:flex-row'>
                    <div className=' flex flex-col justify-center items-center px-5' >
                        <div className=' h-40 w-40 rounded-full bg-black border-2 shadow-lg shadow-violet-400'></div>
                        <div className='mt-5 flex flex-col'>
                            <label htmlFor="" className='text-bold text-sm md:text-lg'>Upload photo</label>
                            <input type="file" className='border-2 border-gray-600 w-fit rounded-4xl p-1 mt-3' />
                        </div>

                        <div className=' grid grid-cols-2 gap-10  my-10 w-fit'>

                            <div className='flex flex-col'>
                                <label htmlFor="" className='mb-2 font-bold text-lg'>User Id:</label>
                                <input type="text" className=' border-2 border-gray-600 p-2 rounded-xl ' defaultValue={user.id} readOnly />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className='mb-2 font-bold text-lg'>Username:</label>
                                <input type="text" className=' border-2 border-gray-600 p-2 rounded-xl ' defaultValue={user.name} readOnly />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className='mb-2 font-bold text-lg'>Email Address:</label>
                                <input type="text" className=' border-2 border-gray-600 p-2 rounded-xl ' defaultValue={user.email} readOnly />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className='mb-2 font-bold text-lg'>Role:</label>
                                <input type="text" className=' border-2 border-gray-600 p-2 rounded-xl ' defaultValue={user.role} readOnly />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="" className='mb-2 font-bold text-lg'>Phone number:</label>
                                <input type="text" className=' border-2 border-gray-600 p-2 rounded-xl ' defaultValue={user.role} readOnly />
                            </div>
                        </div>
                        <div className='p-2 rounded-xl border-2 border-violet-400 font-bold hover:bg-violet-400 hover:text-black hover:scale-75 hover:cursor-pointer'>
                            Edit
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

export default UsersProfile
