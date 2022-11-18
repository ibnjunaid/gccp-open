import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NavBar from '../components/navbar.component';
import Table from '../components/table.components';

type participantsData = {
    headers: string[],
    data: Array<string[]>
}

export default function Institute() {
    console.log('first')
    const router = useRouter()

    const [data, setData] = useState<Array<string[]> | null>(null);
    const [participantsData, setParticipantsData] = useState<participantsData | null>(null);

    async function getInstituteData(instituteId: string) {
            const res = await fetch(`http://localhost:3000/api/data/${instituteId}`);
            return await res.json()
    }

    useEffect(() => {
        if(router.isReady){
            getInstituteData(String(router.query.instituteId)).then((data) => {
                setData(data.data);
                setParticipantsData(data)
            })
        }
    },[router.isReady])


    function handleFilter(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value) {
            if(data){
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

    console.log(participantsData,data)

    if (participantsData && data){
        return (
            <>
                <NavBar filterFunc={handleFilter} />
                <Table headers={participantsData.headers} data={data} />
            </>
        )
    }
    else {
            return <h1>Loading ...</h1>
    }
}
