"use client"
import React, { useState } from 'react'

const ApiKeyPage = ({ props }) => {

    const { user } = props
    const [hide, setHide] = useState(true)

    const handleHide = () => {
        if (hide) {
            setHide(false)
        } else if (!hide) {
            setHide(true)
        }
    }

    return (
        <div>
            <div className='flex flex-col w-fit '>
                <label htmlFor="" className='font-bold'>API Key</label>

                <div>
                    {hide ? <></> :
                        <input
                            defaultValue={user.apiKey}
                            type="text" className='p-2 border-2 border-gray-600 rounded-xl' />
                    }

                    {hide ?

                        <button
                            onClick={handleHide}
                            className='bg-violet-400 p-2 rounded-xl mx-4 text-black font-bold hover:scale-90 hover:cursor-pointer' > Show API key</button>
                        :
                        <button
                            onClick={handleHide}
                            className='bg-violet-400 p-2 rounded-xl mx-4 text-black font-bold hover:scale-90 hover:cursor-pointer' > Hide API key</button>
                    }

                </div>
            </div>
        </div>
    )
}

export default ApiKeyPage
