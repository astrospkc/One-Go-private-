"use client"

import React, { useContext, useEffect, useState } from 'react';
// import { CollectionForm } from '@/components/CollectionForm'
import { cn } from "@/lib/utils";
import Link from 'next/link';
import getAllCollection from '@/lib/getAllCollections';
import { SingleCollection } from '../../../../types';
import { CollectionContext } from '@/context/CollectionProvider';




const Collection = () => {
    const { collection, setCollection } = useContext(CollectionContext)
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        const token = localStorage.getItem('token')
        const fetchCollections = async () => {
            setLoading(true)
            try {
                if (token) {
                    const collection_data: Promise<SingleCollection[]> = getAllCollection(token)
                    const data = await collection_data
                    console.log("data collection: ", data)
                    setCollection(data)
                } else {
                    throw new Error("token null")
                }

            } catch (error) {
                console.error("Error fetching collections:", error);
            } finally {
                setLoading(false)
            }
        }
        fetchCollections()
    }, [])

    console.log("collections: ", collection)
    if (loading) return <div>loading...</div>

    return (
        <div className="p-6 font-serif">
            <h2 className="text-lg md:text-2xl font-bold mb-4 "><span className='font-bold text-2xl md:text-6xl'>L</span><span>ist of All Collections</span></h2>
            <div>
                <div className=" w-full grid grid-cols-3 gap-4">
                    {collection && collection.length > 0 &&
                        collection.map((val, ind) => {
                            // console.log("val: ", val)
                            return (

                                <Link
                                    key={ind}
                                    href={`/dashboard/project/${val.id}`}
                                >
                                    <div

                                        className={cn(
                                            "group w-full  shadow-violet-950 cursor-pointer overflow-hidden relative card h-70 rounded-md shadow-lg mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
                                            "bg-[url(https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80)] bg-cover",
                                            // Preload hover image by setting it in a pseudo-element
                                            // "before:bg-[url(https://unsplash.com/photos/cozy-room-with-two-red-chairs-and-car-memorabilia-5jbjClZI8SA)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
                                            "hover:bg-[url(https://unsplash.com/photos/cozy-room-with-two-red-chairs-and-car-memorabilia-5jbjClZI8SA)]",
                                            "hover:bg-black", "hover:shadow-lg", "hover:shadow-violet-500", "hover:text-violet-950",
                                            // "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
                                            "transition-all duration-500"
                                        )}
                                    >
                                        <div className="text relative z-50">
                                            <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
                                                {val.title.toUpperCase()}

                                            </h1>
                                            <p className="font-normal text-base text-gray-50 relative my-4">
                                                {val.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    );
};

export default Collection;
