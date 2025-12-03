"use client"

import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import Link from 'next/link';



import useCollectionStore from '@/store/collectionStore';
import { Trash2Icon } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { collectionService } from '@/services/collectionService';



const Collection = () => {
    const { collection, setCollection } = useCollectionStore()
    const { token } = useAuthStore()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    console.log("collection: ", collection)

    const handleDeleteCollection = () => {
        setShowDeleteModal(true)
    }
    const deleteCollection = async (col_id: string) => {
        try {
            const response = await collectionService.deleteCollectionById(col_id, token)
            const { code } = response
            if (code == 200) {
                const fetchNewCollection = await collectionService.getAllCollection(token)
                const { collections, code } = fetchNewCollection
                if (code == 200) {
                    setCollection(collections)
                }
            }
        } catch (error) {
            console.log("error: ", error)
            throw error as Error
        } finally {
            setShowDeleteModal(false)
        }

    }



    return (
        <div className="p-6 font-serif">
            <h2 className="text-lg text-center shadow-md shadow-orange-500 md:text-2xl font-bold mb-4 rounded-2xl border-1 p-2 border-orange-500/40 "><span className='font-bold text-2xl md:text-6xl'>L</span><span>ist of All Collections</span></h2>
            <div>
                <div className=" w-full grid grid-cols-3 gap-4">
                    {collection && collection.length > 0 &&
                        collection.map((val, ind) => {
                            return (
                                <div
                                    key={ind}
                                    className='relative'
                                >
                                    <div
                                        className={cn(
                                            "group w-full   shadow-violet-950 cursor-pointer overflow-hidden relative card h-70 rounded-md shadow-lg mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
                                            "bg-[url(https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80)] bg-cover",
                                            "hover:bg-[url(https://unsplash.com/photos/cozy-room-with-two-red-chairs-and-car-memorabilia-5jbjClZI8SA)]",
                                            "hover:bg-black", "hover:shadow-lg", "hover:shadow-violet-500", "hover:text-violet-950",
                                            "transition-all duration-500"
                                        )}
                                    >

                                        <Link
                                            key={ind}
                                            href={{ pathname: `/dashboard/project/${val.id}`, query: { title: `${val.title.toUpperCase()}` } }}
                                        >
                                            <div className="text relative z-50">
                                                <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
                                                    {val.title.toUpperCase()}

                                                </h1>
                                                <p className="font-normal text-base text-gray-50 relative my-4">
                                                    {val.description}
                                                </p>
                                            </div>

                                        </Link>
                                        <div className=''>
                                            {
                                                !showDeleteModal &&
                                                <button onClick={handleDeleteCollection} className="bg-violet-500 text-white px-4 py-2 rounded-md hover:cursor-pointer hover:bg-violet-700 transition-colors duration-200">
                                                    <Trash2Icon />
                                                </button>
                                            }

                                        </div>

                                    </div>
                                    {
                                        showDeleteModal &&
                                        <div className='px-2 py-1 rounded-2xl gap-2  flex-col absolute z-50 -bottom-30 right-0 w-3/4 h-1/3 bg-black shadow-sm shadow-violet-700 mb-10  flex  items-center justify-center'>
                                            <p>Are you sure you want to delete this collection?</p>
                                            <div className='gap-2 flex flex-row left-0'>
                                                <button onClick={() => deleteCollection(val.id)} className="bg-violet-500 text-white px-4 py-2 rounded-md hover:cursor-pointer hover:bg-violet-700 transition-colors duration-200">
                                                    yes
                                                </button>
                                                <button onClick={() => setShowDeleteModal(false)} className="bg-violet-500 text-white px-4 py-2 rounded-md hover:cursor-pointer hover:bg-violet-700 transition-colors duration-200">
                                                    no
                                                </button>
                                            </div>

                                        </div>
                                    }

                                </div>

                            )
                        })
                    }

                </div>
            </div>
        </div>
    );
};

export default Collection;
