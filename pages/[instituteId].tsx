import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/navbar.component';
import Table from '../components/table.components';
import load_img from '../utils/loading.gif'
import Image from 'next/image'
import { filterSensitiveData, getInstituteDetails, getInstitutions } from '../utils/utils';
import { getDataFromSheet, getSheetTitles } from '../utils/sheets';
import logger from '../utils/logger';

type participantsData = {
    instituteDetails: any;
    headers: string[],
    data: Array<string[]>
}

type InstituteProps = {
    is404: boolean
    instituteDetails: any;
    headers: string[],
    data: Array<string[]>
}

export default function Institute(props: InstituteProps) {

    const router = useRouter()

    const [pageNotFound, setPageNotFound] = React.useState<boolean>(props.is404)

    const [data, setData] = useState<Array<string[]>>(props.data);
    const [participantsData, setParticipantsData] = useState<participantsData>(props);

    if (router.isFallback) {
        return (<div className='object-center max-w-full flex justify-center items-center mt-40'>
            <Image
                className='object-center '
                src={load_img}
                alt="loading-img"
                width={500}
                height={500}
            />
        </div>
        )
    } else {
        if (participantsData.headers.length > 0) {
            return (
                <>
                    <NavBar filterFunc={handleFilter} instituteName={participantsData.instituteDetails.InstituteName} />
                    <Table headers={participantsData.headers} data={data} />
                    <p>Static Generation on {(new Date()).toISOString()}</p>
                </>
            )
        }
        else if (pageNotFound) {
            return <>
                {
                    <><main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
                        <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
                        <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
                            Institution Not Found
                        </div>
                        <button className="mt-5">
                            <a
                                className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
                            >
                                <button onClick={() => router.push("/")} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Go Back</button>
                            </a>
                        </button>
                    </main></>
                }
            </>
        }
    }


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

}

export async function getStaticPaths() {
    const res = await getInstitutions();
    if (res !== null) {
        return {
            paths: res.map((institution: string) => {
                return {
                    params: {
                        instituteId: institution
                    }
                }
            }),
            fallback: 'blocking',
        }
    }
    else {
        return {
            paths: [],
            fallback: 'blocking',
        }
    }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: any) {
    const instituteId = context.params.instituteId;
    const instituteDetails = await getInstituteDetails(String(instituteId));
    if (instituteDetails === null) {
        logger.error("Institute Details not found");
        return { props: { is404: true, instituteDetails: {}, headers: [], data: [[]] } }
    }
    const sheetTitles = await getSheetTitles(instituteDetails.sheetId);
    const latestTableTitle = sheetTitles[sheetTitles.length - 1];
    const data = await getDataFromSheet(
        instituteDetails.sheetId,
        latestTableTitle
    )
    const filteredData = filterSensitiveData(data);
    return {
        props: {
            ...filteredData, instituteDetails: { ...instituteDetails, sheetId: null },
            is404: false, revalidate: 7200
        }
    }
}