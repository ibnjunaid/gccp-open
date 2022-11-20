import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/navbar.component';
import Table from '../components/table.components';
import load_img from '../utils/loading.gif'
import Image from 'next/image'

type participantsData = {
    headers: string[],
    data: Array<string[]>
}

export default function Institute() {

    //checking invalid page/route hit.
    const [pageNotFound, setPageNotFound] = React.useState<boolean>(false)

    console.log('first')
    const router = useRouter()

    const [data, setData] = useState<Array<string[]> | null>(null);
    const [participantsData, setParticipantsData] = useState<participantsData | null>(null);

    async function getInstituteData(instituteId: string) {
        const res = await fetch(`http://192.168.1.4:3000/api/data/${instituteId}`);

        //retrieving response code for false route
        const responseCode = res.status;
        if (responseCode === 404) {
            setPageNotFound(true)
        }
        return await res.json()
    }



    useEffect(() => {
        if (router.isReady) {
            getInstituteData(String(router.query.instituteId)).then((data) => {
                setData(data.data);
                setParticipantsData(data)
            })
        }
    }, [router.isReady])


    function handleFilter(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value) {
            if (data) {
                const filtered_data = data.filter(
                    (entry: any) => entry.some(
                        (e: string) => e.toLowerCase().includes(event.target.value.toLowerCase())
                    )
                )
                setData(filtered_data)
            }
        } else {
            if (participantsData !== null) {
                setData(participantsData.data)
            }
        }
    }

    console.log(participantsData, data)

    if (participantsData && data) {
        return (
            <>
                <NavBar filterFunc={handleFilter} />
                <Table headers={participantsData.headers} data={data} />
            </>
        )
    }
    else {
        return <>
            {
                pageNotFound ? (<><main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
                    <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
                    <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
                        Page Not Found
                    </div>
                    <button className="mt-5">
                        <a
                            className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
                        >
                            <button onClick={() => router.push("/")} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Go Back</button>

                        </a>
                    </button>
                </main></>) : (<div className='object-center max-w-full flex justify-center items-center mt-40'
                >
                    <Image
                        className='object-center '
                        src={load_img}
                        alt="loading-img"
                        width={500}
                        height={500}
                    />
                </div>)
            }
        </>
    }
}
