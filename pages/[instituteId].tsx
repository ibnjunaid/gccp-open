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
        console.log(res.body)
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
            <div className='object-center max-w-full flex justify-center items-center mt-40'
            >
                <Image
                    className='object-center '
                    src={load_img}
                    alt="loading-img"
                    width={500}
                    height={500}
                />
            </div>
        </>
    }
}
